(function () {
    'use strict';

    angular
        .module('gaddum.player')
        .factory('playerService', playerService);

    playerService.$inject = [
        '$timeout',
        '$q',
        'gaddumMusicProviderService'

    ];

    function playerService(
        $timeout,
        $q,
        gaddumMusicProviderService

    ) {

        function buildDummyTrackObject(){

            TrackInfo.build(
                "Some Name",
                "Some Album",
                "Some Artist",
                2800,
                "https://blh.com/spotifytracks/erwghwerpgoehrgpoeiwhgogi/erpgiehgpuerhgerh/",
                "https://blh.com/pics/ergerjgwpofwejew/ewflwefjgpo.jpg",
                "ergjerigergoierhgoiergiheroi",
                "gaddumMusicProviderSpotifyService"
            );

        }


        var EVENT_HANDLER_PROMISE = null;

        function asyncOnEvent(eventIdentifier){
            var deferred = $q.defer();

            $timeout(
                function(){
                    if(EVENT_HANDLER_PROMISE){
                        EVENT_HANDLER_PROMISE(eventIdentifier).then(
                            deferred.resolve,
                            deferred.reject 
                        );
                    }
                    deferred.resolve();
                }
            );

            return deferred.promise;
        }


        function asyncControlSkipNext(){
            var deferred = $q.defer();

            $timeout(
                function(){
                    console.log("control Skip Next." );
                    deferred.resolve(
                        // dummy
                        buildDummyTrackObject()
                    );
                }
            );

            return deferred.promise;
        }

        function asyncControlSkipPrev(){
            var deferred = $q.defer();

            $timeout(
                function(){
                    console.log("control Skip Prev." );
                    deferred.resolve(
                        // dummy
                        buildDummyTrackObject()
                    );
                }
            );


            return deferred.promise;
        }

        function asyncControlBegin(){
            var deferred = $q.defer();

            $timeout(
                function(){
                    console.log("control Begin." );
                    deferred.resolve(
                        // dummy
                        buildDummyTrackObject()
                    );
                }
            );

            return deferred.promise;
        }


        function asyncControlPlay(){
            var deferred = $q.defer();

            $timeout(
                function(){
                    console.log("control Play." );
                    deferred.resolve();
                }
            );

            return deferred.promise;
        }

        function asyncControlPause(){
            var deferred = $q.defer();

            $timeout(
                function(){
                    console.log("control Pause." );
                    deferred.resolve();
                }
            );


            return deferred.promise;
        }

        
        function initialise(eventHandlerPromise){
            EVENT_HANDLER_PROMISE = eventHandlerPromise;
            // this will kick-off a process which will lead 
            // an event being broadcast containing login information
            gaddumMusicProviderService.asyncIsLoggedIn();
        }


        var service = {
            // requests the next track in the playlist
            // writes an Observation to the database
            // returns the TrackInfo object for the selected track,
            // or null if there are no more tracks
            asyncControlSkipNext:asyncControlSkipNext,

            // requests the previous track in the playlist
            // writes an Observation to the database
            // returns the TrackInfo object for the selected track,
            // or null if there are no more tracks
            asyncControlSkipPrev:asyncControlSkipPrev,


            // requests to restart the track in the playlist
            // writes an Observation to the database
            // returns the TrackInfo object for the selected track,
            // or null if there are no more tracks
            asyncControlBegin:asyncControlBegin,

            // requests to start the paused track
            // writes an Observation to the database
            asyncControlPlay:asyncControlPlay,

            // requests to pause the playing track
            // writes an Observation to the database
            asyncControlPause:asyncControlPause,

            // event handler interface. This is passed to the
            // Music Provider service on initialisation
            // The music provider will pass EventIdentifier objects.
            promiseHandleEvent:asyncOnEvent,


            // provides a promise to handle events passed to the player service
            initialise


        };

        return service;
    }





})();
