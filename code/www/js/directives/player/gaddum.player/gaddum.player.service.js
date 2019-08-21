(function () {
    'use strict';

    console.log("HERE: Gaddum Player");

    angular
        .module('gaddum.player')
        .factory('playerService', playerService);

    playerService.$inject = [
        '$timeout',
        '$q',
        'gaddumMusicProviderService'

    ];


    // User uses a slider box component to generate a playlist.
    // Slider-box service creates a MoodedPlaylist.
    // Slider-box service calls userProfilerService.asyncLoadMoodedPlaylists()

    // playerService is a listener on the userProfileService
    // userProfilerService.loads in the new playlist, broadcasts a PLAYLIST_NEW event
    // playerService catches PLAYLIST_NEW event:
    //      playerService calls userProfilerService.player.asyncNext
    //      userProfilerService returns a genericTrack object.
    //      playerService calls gaddumMusicProviderService.setTrack() with the genericTrack
    //      gaddumMusicProviderService calls into the concrete musicServiceProvider.asyncSetTrack()
    //      Concrete musicProviderService searches cache for genericTrack. 
    //          If not found, it goes online to search
    //           if found, broadcasts a TRACK_NEW event to listeners, with a payload of TrackInfo object
    //           if not found, broadcasts a TRACK_NOT_FOUND to listeners
    // playerService broadcasts PLAYLIST_NEW event


    // playerService is a listener on the musicServiceProvider.
    // playerService catches TRACK_NOT_FOUND event:
    //      playerService calls userProfilerService.player.asyncNext
    //      if userProfilerService returns a genericTrack object.
    //          playerService calls gaddumMusicProviderService.setTrack() with the genericTrack, **as above**
    //      if userProfileObject returns null
    //          playerService broadcasts a PLAYLIST_END event
    // otherwise, playerService re-broacasts all events to listener. 
    // 
    // gaddumPlayerController catches PLAYLIST_NEW:
    //      resets controller. disables prevButton, playButton, enables next button
    // gaddumPlayerController catches TRACK_NEW: 
    //      enables playButton
    // gaddumPlayerController catches TRACK_PROGRESS_PERCENT:
    //      enables pauseButton, prevButton (to repeat), nextButton
    //      displays new progress from payload.
    //      
    // gaddumPlayerController catches TRACK_PAUSED:
    //      enbles playButton
    // gaddumPlayerController catches LOGGED_OUT
    //      disables all controls
    // gaddumPlayerController catches LOGGED_IN
    //      re-enables all controls
    // gaddumPlayerController catches PLAYLIST_END
    //      enables prevButton, disables playButton, nextButton
    //      initialises track and artistReadout
    //      blanks album artwork







    function playerService(
        $timeout,
        $q,
        gaddumMusicProviderService

    ) {




        var EVENT_HANDLER_PROMISE = null;




        function asyncDoSkipNext() {
            var deferred = $q.defer();
            userProfilerService.player.asyncNext().then(
                function onTrack(genericTrack) {
                    gaddumMusicProviderService.setTrack(genericTrack).then(
                        deferred.resolve,
                        deferred.reject
                    );
                },
                deferred.reject
            );
            return deferred.promise;
        }




        function asyncHandleTrackError() {
            return doSkipNext();
        }



        function asyncHandleEvent(eventIdentifier) {
            switch (eventIdentifier.getId()) {
                case eventIdentifier.TRACK_ERROR:
                    return asyncHandleTrackError();
            }

        }


        function asyncBroadcastEvent(event) {
            var deferred = $q.defer();

            $timeout(

                function () {
                    if (EVENT_HANDLER_PROMISE) {
                        EVENT_HANDLER_PROMISE(event).then(
                            deferred.resolve,
                            deferred.reject
                        );
                    }
                }

            );


            return deferred.promise;
        }



        function asyncOnEvent(eventIdentifier) {
            var deferred = $q.defer();

            $timeout(
                function () {
                    asyncHandleEvent(eventIdentifier).then(
                        function (isConsumed) {
                            if (!isConsumed) {
                                asyncBroadcastEvent(eventIdentifier).then(
                                    deferred.resolve,
                                    deferred.reject
                                );
                            } else {
                                deferred.resolve()
                            }
                        },
                        deferred.reject
                    );
                }
            );
            return deferred.promise;
        }

        function asyncControlSkipNext() {
            console.log("control Skip Next.");
            return asyncDoSkipNext();
        }

        function asyncControlSkipPrev() {
            console.log("control Skip Next.");
            var deferred = $q.defer();

            userProfilerService.player.asyncPrev().then(
                function onTrack(genericTrack) {
                    gaddumMusicProviderService.setTrack(genericTrack).then(
                        deferred.resolve,
                        deferred.reject
                    );
                },
                deferred.reject
            );


            return deferred.promise;
        }

        function asyncControlPlay() {
            console.log("control Play.");
            var deferred = $q.defer();

            $timeout(
                function () {

                    deferred.resolve();
                }
            );

            return deferred.promise;
        }

        function asyncControlPause() {
            console.log("control Pause.");
            var deferred = $q.defer();

            $timeout(
                function () {

                    deferred.resolve();
                }
            );


            return deferred.promise;
        }


        function initialise(eventHandlerPromise) {
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
            promiseHandleEvent: asyncOnEvent,


            // provides a promise to handle events passed to the player service
            initialise


        };

        return service;
    }





})();
