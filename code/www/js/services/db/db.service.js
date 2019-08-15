// see https://github.com/dpa99c/cordova-sqlite-porter-example-native-plugin
// see plugin https://github.com/dpa99c/cordova-sqlite-porter
// see plugin https://github.com/litehelpers/Cordova-sqlite-storage


(function () {
    'use strict';

    angular
        .module('app.db')
        .factory('dbService', dbService);

    dbService.$inject = [
        'utilitiesService'
    ];

    function dbService(
        utilitiesService
    ) {

        var service = {

            DB_NAME: "gaddum",
            DB_LOCATION: "default",
            SERVICE_STATES_KEY: "states",

            private: {
                db: null
            }
        };

        //PUBLIC
        service.isDBOpen = function () {
            return ((service.private.db));
        };

        //PUBLIC
        service.openDB = function (success, fail) {
            service.private.db = window.sqlitePlugin.openDatabase(
                { name: service.DB_NAME, location: service.DB_LOCATION }, 
                function onOpenEnableForeignKeys(){
                    service.private.db.executeSql("PRAGMA foreign_keys = on", [],
                    success,
                    fail)
                }, 
                fail);
        };

        //PUBLIC
        service.closeDB = function (success, fail) {
            var db = service.private.db;
            service.private.db = null;
            db.close(
                success,
                fail
            );
        };

        //PUBLIC
        service.deleteDB = function (success, fail) {
            service.private.db = null;
            window.sqlitePlugin.deleteDatabase(
                { name: service.DB_NAME, location: service.DB_LOCATION },
                function(){
                    console.log("deleted DB.");
                    success();
                },
                function(){
                    console.log("could not delete DB");
                    fail();
                }
            );
        };

        //PUBLIC
        service.dumpDB = function (success) {
            cordova.plugins.sqlitePorter.exportDbToSql(
                service.private.db,
                { successFn: success }
            );
        }

        //PUBLIC
        service.createDBFromApplicationDir = function (path, success, fail) {
            utilitiesService.readApplicationFileAsString(
                path,
                function (content) {
                    service.private.createDBFromSQL(
                        content,
                        success,
                        fail
                    );
                }
                ,
                fail
            );
        };

        //PUBLIC
        /**
         * Takes an incoming sql query as sqlite.
         * strips all comments, removes whitespace.
         * sql may contain multiple queries, seperated by the standard delimiter, ';'.
         * These are split, and placed into an array.
         * If the array has only one element, the sql is treated like a query.
         * It is given to the sqlite API, and the query results are returned in the ususal way.
         * If the array has more than one element, the query is treated more as a multiple insert / upsert.
         * The elements are sumbitted in a single transaction, and the results returned in the usual way of this API.
         */
        service.query = function (
            sql,
            success, // expect a result set 
            fail) {
            if (service.private.db) {

                // remove comments and whitespace
                var stripped = utilitiesService.strip(
                    sql
                );

                // split into multiple sqlStatement on the delimiter
                var split = utilitiesService.split(stripped);

                // check for multiple transactions
                if (split.length > 1) {
                    service.private.db.transaction(
                        function (transaction) {
                            for (var index = 0; index < split.length; index++) {

                                var param = split[index];
                                //console.log("T-QUERY: " + param);

                                transaction.executeSql(param);
                            }
                        },
                        function (err) {
                            //console.log("FAIL: " + JSON.stringify(err));
                            fail(err);
                        },
                        function (arg) {
                            //console.log("SUCCESS: " + JSON.stringify(arg));
                            success();
                        }

                    );
                } else {
                    // otherwise, it's a query.
                    var param = split[0];
                    //console.log("QUERY: " + param);
                    service.private.db.executeSql(
                        param,
                        [],
                        function (arg) {
                            //console.log("SUCCESS: " + JSON.stringify(arg));
                            success(arg);
                        },
                        function (err) {
                            //console.log("FAIL: " + JSON.stringify(err));
                            fail(err);
                        }
                    );
                }

            } else {
                fail("no database.");
            }
        }

        service.private.createDBFromSQL = function (sql, success, fail) {
            window.sqlitePlugin.selfTest(
                function () {
                    service.private.db = window.sqlitePlugin.openDatabase(
                        { name: service.DB_NAME, location: service.DB_LOCATION }
                    );
                    if (service.private.db) {

                        console.log("turning OFF foreign keys");
                        service.private.db.executeSql("PRAGMA foreign_keys = off", [],
                            function () {
                                var stripped = utilitiesService.removeComments(sql);

                                cordova.plugins.sqlitePorter.importSqlToDb(
                                    service.private.db,
                                    stripped,
                                    {
                                        successFn: function () {
                                            console.log("turning ON foreign keys");
                                            service.private.db.executeSql("PRAGMA foreign_keys = on", [],
                                                success,
                                                fail)
                                        },

                                        errorFn: fail

                                    }
                                );
                            },
                            fail);
                    } else {
                        fail("database failure on open.");
                    }
                },
                function (error) {
                    fail("self-test failed: " + error);
                }
            );
        };


        return service;
    }
})();






