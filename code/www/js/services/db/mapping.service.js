(function () {
    'use strict';

    angular
        .module('app.db')
        .factory('mappingService', mappingService);

    mappingService.$inject = [
        'dbService',
        'utilitiesService'
    ];
    function mappingService(
        dbService,
        utilitiesService
    ) {

        var service = {
            definitions: [],
            mappings: {},
            functions: {},
            private: {
                PARAMETER_PREFIX: 'replacement_parameter_'
            }
        };

        service.initialise = function (
            resourcePath,
            success,
            fail) {

            service.private.createMappingDefinition(
                resourcePath,
                success,
                fail
            );

        }

        //PUBLIC
        service.getResponses = function (rows) {
            var result = [];
            for (var index = 0; index < rows.length; index++) {
                result.push(rows.item(index));
            }
            return result;
        };

        
        
        
        service.queries = function (queries, success, fail) {
            service.private.generateSqlFromArray(
                queries,
                function (sql) {
                    service.private.executeSql(sql, success, fail);
                },
                fail);
        }

        service.generateQuery = function (function_name, parameters) {
            return {
                function_name: function_name,
                parameters: parameters
            }
        }

        service.getParameterPrefix = function () {
            return service.private.PARAMETER_PREFIX;
        }

        /**
         * generates an AND clause which can be used in a generated SQL expression for later substitution
         * for example:
         * parameters = {section_id: 10, question_id: 20 } 
         * operator = '='
         * prefix = "replacement_parameter_"
         * would return:
         * "section_id" = replacement_parameter_section_id AND "question_id" = replacement_parameter_question_id 
         */
        service.generateSqlAndClause = function (parameters, operator, prefix) {
            var result = "";
            if (parameters) {
                var keys = Object.keys(parameters);
                for (var index = 0; index < keys.length; index++) {
                    var name = keys[index];
                    if (parameters.hasOwnProperty(name)) {

                        result += '"' + name + '"' + " " + operator + " " + prefix + name;

                        if (index < keys.length - 1) {
                            result += " AND "
                        }
                    }
                }
            }
            return result;
        }


        service.generateSqlBetweenDateClause = function (
            param_name,

            from_date,
            to_date
        ) {

            result = "";

            var from_yyyy_mm_dd = null;
            if (from_date) {
                from_yyyy_mm_dd = utilitiesService.formatDateAsString(from_date);
            } else {
                from_yyyy_mm_dd = utilitiesService.createDateAsString();
            }

            var to_yyyy_mm_dd = null;
            if (to_date) {
                to_yyyy_mm_dd = utilitiesService.formatDateAsString(to_date);
            } else {
                to_yyyy_mm_dd = utilitiesService.createDateAsString();
            }

            if ((from_yyy_mm_dd) && (to_yyyy_mm_dd)) {
                result += '"' + param_name + '"' + " BETWEEN " + to_yyyy_mm_dd + " AND " + from_yyyy_mm_dd;
            }

            return result;

        }

        service.query = function (function_name, parameters, success, fail) {


            if (!function_name) { // catch undefined
                function_name = null;
            }
            if (!parameters) { // catch undefined
                parameters = null;
            }

            //console.log("QUERY: FUNCTION: " + function_name);

            service.private.generateSql(
                function_name,
                parameters,
                function (sql) {
                //        console.log("----SQL--");
                //        console.log(sql);
                //        console.log("--- END SQL ---");
                    service.private.executeSql(sql, success, fail);
                },
                function(error){
                    fail(error);
                });
        }

        service.dumpDB = function (fnSuccess) {
            dbService.dumpDB(fnSuccess);
        }


        /**
         * Like query, but instead of a function name which looks up a pre-made function in which to substitute values,
         * It takes sql directly, and substitues values as per the 'query' function.
         */
        service.queryFromSql = function (sql, parameters, success, fail) {
            if (!parameters) { // catch undefined
                parameters = null;
            }

            service.private.substituteParameters(
                sql,
                parameters,
                function (sql) {
                    service.private.executeSql(sql, success, fail);
                },
                fail);
        }

        //PRIVATE
        service.private.executeSql = function (sql, success, fail) {
            dbService.query(
                sql,
                function (result) {
                    success(result);
                },
                function (error) {
                    fail(error);
                }
            );
        }

        service.private.generateSqlFromArray = function (queries, success, fail) {
            if (queries && queries.length > 0) {
                var sql = "";
                var error = null;
                for (var index = 0; (index < queries.length) && (!error); index++) {
                    var function_name = queries[index].function_name;
                    var parameters = queries[index].parameters;
                    service.private.generateSql(
                        function_name,
                        parameters,
                        function (result) {
                            sql += result;
                        },
                        function (e) {
                            error = e;
                        }
                    );
                }
                if (!error) {
                    success(sql);
                } else {
                    fail(error);
                }
            } else {
                success();
            }
        }






        //PRIVATE
        service.private.generateSql = function (function_name, parameters, success, fail) {
            var sql = null;
            var error = null;

            try {
                sql = service.mappings[function_name];
            } catch (e) {
                error = e;
            }

            if (!error) {
                service.private.substituteParameters(sql, parameters, success, fail);
            } else {
                fail(error);
            }
        }

        //PRIVATE
        service.private.substituteParameters = function (sql, parameters, success, fail) {

            var error = null;

            if (parameters) {
                for (var name in parameters) {
                    if (parameters.hasOwnProperty(name)) {
                        service.private.substituteInSql(
                            name,
                            parameters[name],
                            sql,
                            function (result) {
                                sql = result;
                            },
                            function (e) {
                                error = e;
                            });
                    }
                }
            }

            if (!error) {
                success(sql);
            } else {
                fail(error);
            }

        }


        //PRIVATE
        service.private.applyPrefix = function (prefix, term) {
            var result = term;
            if (prefix) {
                result = prefix + term;
            }
            return result;
        }



        function substitute(text, searchFor, replaceWith){
            var expression = "\\b(" + searchFor + ")\\b";

            return  text.replace(new RegExp(expression, 'g'), replaceWith);
        }


        //PRIVATE
        // whole thing needs replacing with parameterised sql, now that the base lib supports it.
        service.private.substituteInSql = function (
            searchFor,
            object,
            sql,
            success,
            fail) {

            var result = sql;

            try {
                var _searchFor = service.private.applyPrefix(service.private.PARAMETER_PREFIX, searchFor);
                var replaceWith = null;
                if(object == null){

                    // replace either numeric or string value with null
                    // desparate kludge.
                    replaceWith = 'null';
                    
                    var variation1 = RegExp("\""+ _searchFor + "\"");
                    var variation2 = RegExp("'" + _searchFor + "'");
                    var variation3 = _searchFor; // numeric

                    result = sql.replace(variation1, replaceWith);
                    result = result.replace(variation2, replaceWith);
                    result = substitute(result, variation3, replaceWith);
                    console.log("mappingService: substituteInSql: warning: replaced null values");
                    
                }else{
                    replaceWith = object.toString();
                    result = substitute(sql, _searchFor, replaceWith);
                }

            } catch (e) {
                console.log("substituteInSql: problem substituting: " + replaceWith + e);
            }

            success(result);

        }


        var readDefinition = function (index, definitions, mappings, success, fail) {
            if (index < definitions.length) {
                var definition = definitions[index];
                index++;
                utilitiesService.readApplicationFileAsString(
                    definition.path,
                    function (content) {
                        if (content) {
                            if (content.length > 0) {
                                content = utilitiesService.strip(content);
                                mappings[definition.function] = content;
                            } else {
                                console.log("mappingService: readDefinition: definition has no content. " + definition.path);
                            }
                        } else {
                            console.log("mappingService: readDefinition: definition content is undefined. " + definition.path);
                        }
                        readDefinition(index, definitions, mappings, success, fail);
                    },
                    function (error) {
                        fail("read err: " + definition.path);
                    }
                );
            } else {
                success(mappings);
            }
        }

        var readDefinitions = function (definitions, success, fail) {
            var mappings = {};
            if (definitions && definitions.length > 0) {
                var index = 0;
                readDefinition(index, definitions, mappings, success, fail);
            } else {
                success(mappings);
            }
        }


        //PRIVATE
        service.private.createMappingDefinition = function (
            resourcePath,
            success,
            fail
        ) {
            service.definitions = [];
            utilitiesService.readFileToJSONArray(
                resourcePath,
                function (items) {
                    service.definitions = items;
                    readDefinitions(
                        items,
                        function (mappings) {
                            service.mappings = mappings;
                            success(service.mappings);
                        },
                        fail
                    );

                },
                fail);
        };

        return service;
    }
})();