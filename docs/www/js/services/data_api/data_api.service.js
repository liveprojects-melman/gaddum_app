(function () {
    'use strict';

    angular
        .module('dataapijs')
        .factory('dataApiService', dataApiService);

    dataApiService.$inject = [
        '$q',
        'moment',
        'mappingService',
        'dbService',
        'utilitiesService'


    ];

    function dataApiService(
        $q,
        moment,
        mappingService,
        dbService,
        utilitiesService

    ) {

        function createError(code, message) {
            return {
                code: code,
                message: message
            };
        }

        function asString(arg) {
            var result = "\"" + arg + "\"";
            return result;
        }


        var getBase64Resource = function (resource_id, success, fail) {
            if (resource_id) {
                mappingService.query("base64_resource", { resource_id: resource_id },
                    function (result) {
                        var rows = mappingService.getResponses(result.rows);
                        if (rows.length > 0) {
                            success(rows[0])
                        } else {
                            fail("no resource for id");
                        }
                    }
                    , fail);
            } else {
                success(null);
            }
        }


        function getSupportedMoodIds(fnSuccess, fnFail) {

            mappingService.query("get_supported_mood_ids", {},
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length > 0) {
                        fnSuccess(rows);
                    } else {
                        fnFail("no supported moods!");
                    }
                }
                , fnFail);
        }



        function asyncGetSupportedMoodIds() {
            var d = $q.defer();
            getSupportedMoodIds(function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }



        function asyncGetMoodDetectionParameters(mood_id) {
            var d = $q.defer();
            getMoodDetectionParameters(mood_id, function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }


        function getMoodDetectionParameters(mood_id, fnSuccess, fnFail){
            mappingService.query("get_mood_detection_parameters", {mood_id : mood_id},
            function (response) {
                var result = {};   
                var rows = mappingService.getResponses(response.rows);

                // returns us a row from the database which we will assume contains at least the columns:
                // mood
                // criteria
                // anything else we will just pass stright through to the client, as parameters.

                if (rows.length > 0) {
                    // we have parameters associated with the mood
                                  

                    rows.forEach(function(row){
                        result[row.criteria] = row; // put all the row data into an attribute for the parameter. client gets everything.
                    });

                } else {
                    console.log("WARN: no parameters for the mood. It won't be detected. id: " + mood_id);
                }
                fnSuccess(result);
            }
            , fnFail);
        } 


        function moodIdToResources(id, fnSuccess, fnFail) {

            mappingService.query("mood_id_to_resources", {mood_id : id},
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length == 1) {
                        fnSuccess(rows[0]);
                    } else {
                        fnFail("mood not found!");
                    }
                }
                , fnFail);
        }



        function asyncMoodIdToResources(id) {
            var d = $q.defer();
            moodIdToResources(id, function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }





       var service = {

            asyncGetSupportedMoodIds: asyncGetSupportedMoodIds,
            asyncGetMoodDetectionParameters: asyncGetMoodDetectionParameters,
            asyncMoodIdToResources: asyncMoodIdToResources

        };


        return service;
    }





})();





