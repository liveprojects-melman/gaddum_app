(function () {
    'use strict';

    console.log("HERE: observerService");

    angular
        .module('gaddum.observer')
        .factory('observerService', observerService);

    observerService.$inject = [
        'ErrorIdentifier',
        'GenericTrack',
        'MoodedPlaylist',
        'StatementCriteria',
        'dataApiService',
        'utilitiesService',
        'Location',
        'locationService',
        'Postcode',
        'postcodeService',
        'TimeSlot',
        'timeService',
        '$timeout'

    ];

    function observerService(
        ErrorIdentifier,
        GenericTrack,
        MoodedPlaylist,
        StatementCriteria,
        dataApiService,
        utilitiesService,
        Location,
        locationService,
        Postcode,
        postcodeService,
        TimeSlot,
        timeService,
        $timeout
    ) {

        var SETTINGS = {
            PRIVACY: {
                COLLECT_LOCATION_HISTORY: {
                    id:"collection_location_history",
                    value: false
                },
                COLLECT_MOOD_HISTORY: {
                    id: "collection_mood_history",
                    value: false
                },
                COLLECT_PLAY_HISTORY: {
                    id: "collection_play_history",
                    value: false
                }
            }
        };

        function asyncInitialiseSettings() {
            var deferred = $q.defer();

            var promises = [];

            promises.push(dataApiService.asyncGetSetting(SETTINGS.PRIVACY.COLLECT_LOCATION_HISTORY.id));
            promises.push(dataApiService.asyncGetSetting(SETTINGS.PRIVACY.COLLECT_MOOD_HISTORY.id));
            promises.push(dataApiService.asyncGetSetting(SETTINGS.PRIVACY.COLLECT_PLAY_HISTORY.id));
          

            $q.all(promises).then(
                function (result) {
                    SETTINGS.PRIVACY.COLLECT_LOCATION_HISTORY.value = result[0];
                    SETTINGS.PRIVACY.COLLECT_MOOD_HISTORY.value = result[1];
                    SETTINGS.PRIVACY.COLLECT_PLAY_HISTORY.value = result[2];
                    
                    deferred.resolve(result);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }




        function asyncInitialise(){
            return asyncInitialiseSettings();
        } 




        function gateMood(container, mood){
            
            if(SETTINGS.PRIVACY.COLLECT_MOOD_HISTORY.value){
                container.mood = mood;
            }
            return container;
        }

        function gateGenericTrack(container, genericTrack){
            
            if(SETTINGS.PRIVACY.COLLECT_PLAY_HISTORY.value){
                container.genericTrack = genericTrack;
            }
            return container;
        }
        



        function asyncGatelocation(container){
            var deferred = $q.defer;

            if(SETTINGS.PRIVACY.COLLECT_LOCATION_HISTORY.value){
                
                locationService.asyncGetLocation().then(
                    function(location){
                        container.location = location;
                        postcodeService.asyncLocationToPostcode(location).then(
                            function(postcode){
                                container.postcode = postcode;
                                promise.resolve(container);
                            },
                            function(error){
                                promise.reject(error);
                            }
                        );
                    },
                    function(error){
                        promise.reject(error);
                    }
                );
            }else{
                
                $timeout(
                    function(){
                        promise.resolve(container);
                    });
            }
            return deferred.promise;
        }




        function asyncCreateConditionalObservation(mood, moodSuitable, trackPercent, numRepeats, genericTrack){
            var deferred = $q.defer();
            
            var result = {
                id : utilitiesService.createUuid(),
                timeStamp : timeService.getTimeStamp(),
                timeSlot : timeService.getCurrentTimeSlot(),
                moodSuitable : moodSuitable,
                trackPercent: trackPercent,
                numRepeats : numRepeats
            }

            function buildFromResult(result){
                return Observation.build(
                    result.id,
                    result.timeStamp,
                    result.mood, 
                    result.timeSlot, 
                    result.location, 
                    result.postcode, 
                    result.trackPercent,
                    result.numRepeats, 
                    result.moodSuitable, 
                    result.genericTrack
                );
            }

            gateMood(result,mood);
            gateGenericTrack(result, genericTrack);
            asyncGatelocation(result).then(
                function onSuccess(){
                    resolve(buildFromResult(result));
                },
                function onError(error){
                    reject(error, buildFromResult(result));
                }
            );



            return deferred.promise;
        }

        function asyncAddObservation(observation){
            return dataApiService.addObservation(observation);
        }


        function asyncSeekObservationsLike(observation){
    
        }


        function asyncCreateObservation(mood, moodSuitable, trackPercent, numRepeats, genericTrack){
            var deferred = $q.defer();
            asyncCreateConditionalObservation(mood, moodSuitable, trackPercent, numRepeats, genericTrack).then(

                function onCreateObservation(observation){
                    asyncAddObservation(observation).then(
                        function onWriteObservation(){
                            deferred.resolve(observation);
                        },
                        function(err){
                            deferred.reject(err);
                        }
                    );
                },
                function(err){
                    deferred.resolve(err);
                }

            );
            return deferred.promise;
        }

        var service = {
            // do intialise to update settings from DB
            asyncInitialise : asyncInitialise,
            asyncCreateObservation: asyncCreateObservation,
            asyncSeekObservations: asyncSeekObservationsLike
        };

        return service;
    }





})();