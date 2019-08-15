(function () {
    'use strict';

    angular
        .module('gaddum.player')
        .factory('playerService', playerService);

    playerService.$inject = [
        '$timeout',
        '$q'

    ];

    function playerService(
        $timeout,
        $q

    ) {

        var CONTROL_EVENT_HANDLER_PROMISE = null;







        function asyncOnEvent(eventIdentifier) {
            var deferred = $q.defer();


            $timeout(
                function () {

                    if (CONTROL_EVENT_HANDLER_PROMISE) {
                        CONTROL_EVENT_HANDLER_PROMISE(eventIdentifier).then(
                            deferred.resolve,
                            deferred.reject
                        );
                    } else {
                        console.log("WARNING! There no event handler on the playerService");
                        deferred.resolve();
                    }
                }
            );


            return deferred.promise;
        }


        function asyncControlSkipNext() {
            var deferred = $q.defer();


            $timeout(
                function () {
                    console.log("control Skip Next.");
                    deferred.resolve(
                        // dummy
                        buildDummyTrackObject()
                    );
                }
            );


            return deferred.promise;
        }

        function asyncControlSkipPrev() {

            // get the next track.
            // requests the next track from the userProfiler, as a generic track
            // passes the generic track to the musicProvider, which will attempt to play the track
            // musicProvider will send out events, which will be picked up by the event handler in the player. 

            var deferred = $q.defer();


            $timeout(
                function () {
                    console.log("control Skip Prev.");

                    userProfilerService.player.asyncNext().then(
                        function (genericTrack) {
                            gaddumMusicProviderService.asyncSetTrack(genericTrack).then(
                                gaddumMusicProviderService.asyncPlayCurrentTrack().then(
                                    deferred.resolve,
                                    deferred.reject
                                ),
                                deferred.reject
                            );
                        },
                        deferred.reject
                    );
                }
            );


            return deferred.promise;
        }

        function asyncControlBegin() {
            var deferred = $q.defer();


            $timeout(
                function () {
                    console.log("control Begin.");
                    userProfilerService.player.asyncBegin().then(
                        function (genericTrack) {
                            gaddumMusicProviderService.asyncSetTrack(genericTrack).then(
                                gaddumMusicProviderService.asyncPlayCurrentTrack().then(
                                    deferred.resolve,
                                    deferred.reject
                                ),
                                deferred.reject
                            );
                        },
                        deferred.reject
                    );
                }
            );


            return deferred.promise;
        }


        function asyncControlPlay() {
            var deferred = $q.defer();


            $timeout(
                function () {
                    console.log("control Play.");

                    
                        gaddumMusicProviderService.asyncPlayCurrentTrack().then(
                            deferred.resolve,
                            deferred.reject
                        );

                }
            );


            return deferred.promise;
        }

        function asyncControlPause() {
            var deferred = $q.defer();


            $timeout(
                function () {
                    gaddumMusicProviderService.asyncPauseCurrentTrack().then(
                        deferred.resolve,
                        deferred.reject
                    );
                }
            );


            return deferred.promise;
        }

        function initialise(controlEventHandlerPromise) {
            CONTROL_EVENT_HANDLER_PROMISE = controlEventHandlerPromise;
        }

        var service = {

            // initialises.
            // sets a promise to handle events
            // this is normally a controller.
            initalise: initialise,

            // requests the next track in the playlist
            // writes an Observation to the database
            // returns the TrackInfo object for the selected track,
            // or null if there are no more tracks 
            asyncControlSkipNext: asyncControlSkipNext,

            // requests the previous track in the playlist
            // writes an Observation to the database
            // returns the TrackInfo object for the selected track,
            // or null if there are no more tracks             
            asyncControlSkipPrev: asyncControlSkipPrev,


            // requests to restart the track in the playlist
            // writes an Observation to the database
            // returns the TrackInfo object for the selected track,
            // or null if there are no more tracks 
            asyncControlBegin: asyncControlBegin,

            // requests to start the paused track
            // writes an Observation to the database
            asyncControlPlay: asyncControlPlay,

            // requests to pause the playing track
            // writes an Observation to the database
            asyncControlPause: asyncControlPause,

            // event handler interface. This is passed to the 
            // Music Provider service on initialisation
            // The music provider will pass EventIdentifier objects.
            promiseHandleEvent: asyncOnEvent
        };


        return service;
    }





})();