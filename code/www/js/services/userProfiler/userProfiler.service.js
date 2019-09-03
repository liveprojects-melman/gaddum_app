
(function () {
    'use strict';

    angular
        .module('gaddum.userprofiler')
        .factory('userProfilerService', userProfilerService);

    userProfilerService.$inject = [
        '$q',
        'ErrorIdentifier',
        'GenericTrack',
        'MoodedPlaylist',
        'StatementCriteria',
        'dataApiService',
        '$timeout',
        'observerService',
        'EventIdentifier'

    ];

    function userProfilerService(
        $q,
        ErrorIdentifier,
        GenericTrack,
        MoodedPlaylist,
        StatementCriteria,
        dataApiService,
        $timeout,
        observerService,
        EventIdentifier

    ) {

        var EVENT_HANDLER_PROMISE = null;

        var SETTINGS = {
            MAX_SKIP_COUNT: {
                id: 'track_selector_max_skips',
                value: 0
            },
            MAX_TRACK_DURATION_FOR_SKIP_S: {
                id: 'track_selector_max_track_duration_for_skip_s',
                value: 0
            }
        };

        function asyncBroadcastEvent(event){
            var deferred = $q.defer();
      
            $timeout(
      
              function(){
                if(EVENT_HANDLER_PROMISE){
                  EVENT_HANDLER_PROMISE(event).then(
                    deferred.resolve,
                    deferred.reject
                  );
                }
              }
      
            );
      
      
            return deferred.promise;
          }


        function asyncInitialise(returnsAnEventHandlingPromise){

            if (returnsAnEventHandlingPromise) {
                EVENT_HANDLER_PROMISE = returnsAnEventHandlingPromise;
            } else {
                throw (ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "User Profiler Service needs a function returning a promise which will handle change events (new playlists). See EventIdentifier"))
            }


            var deferred = $q.defer();

            $timeout(

                function(){

            //promises.push(dataApiService.asyncGetSetting(SETTINGS.MAX_SKIP_COUNT.id));
            //promises.push(dataApiService.asyncGetSetting(SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S.id));

                    deferred.resolve();

                }

            );

            
            return deferred.promise;

        } 


        // --- player

        function asyncNext() {

            var deferred = $q.defer();

            $timeout(
                function(){

                    deferred.resolve(GenericTrack.build(
                        '4773cabe-a649-4af3-9a9c-768b5fd990fd',
                        'Killer Queen',
                        'Sheer Heart Attack',
                        'Queen',
                        90
                    ));
                }
            );

            return deferred.promise;

        }

        function asyncPrev() {
            var deferred = $q.defer();
            $timeout(
                function(){
                    deferred.resolve(GenericTrack.build(
                        'c07d8279-3609-4143-8a0d-3f0b508839ef',
                        'Lily of the Valley',
                        'Sheer Heart Attack ',
                        'Queen',
                        90
                    ));
                }
            );
            return deferred.promise;
        }

        function asyncBegin() {
            $timeout(
                function(){
                    resolve(GenericTrack.build(
                        '12e1c931-83fe-4948-95c2-4955c68d60d9',
                        'Now I\'m Here',
                        'Sheer Heart Attack',
                        'Queen',
                        90
                    ));
                }
            );
        }

        // the current track is unplayable
        // mark it as bad, and recommend another
        function asyncTrackIsBadGetAnother(){
            $timeout(
                function(){
                    resolve(GenericTrack.build(
                        null,
                        'Lily of the Valley',
                        'Sheer Heart Attack',
                        'Queen',
                        90
                    ));
                }
            );
        }


        // --- Finder

        function asyncFindPlaylists() {
        }

        // --- Loader

        function asyncLoadMoodedPlaylists(arrayMoodedPlaylists) {
            asyncBroadcastEvent(EventIdentifier.build(EventIdentifier.PLAYLIST_NEW, null));

            console.log("Mooded Playlist",arrayMoodedPlaylists);


        }

        // --- Statement

        function asyncApplyStatement(statementCriteria) {
            var mood = null;
            var genericTrack = null;
            try{
                mood = statementCriteria.getMood();
                genericTrack = statementCriteria.getGenericTrack();
            }catch(e){
                throw("asyncApplyStatement: unexpected parameters: needs a MoodIdentifier and a GenericTrack.");
            }
            

            return observerService.asyncCreateObservation(mood, true, 0, 0, genericTrack);

        }

        var service = {
            asyncInitialise,
            player: {
                asyncBegin: asyncBegin, 
                asyncNext: asyncNext,
                asyncPrev: asyncPrev,
                asyncTrackIsBadGetAnother, asyncTrackIsBadGetAnother
            },
            finder: {
                asyncFindPlaylists: asyncFindPlaylists
            },
            loader: {
                asyncLoadMoodedPlaylists: asyncLoadMoodedPlaylists
            },
            statement: {
                asyncApplyStatement: asyncApplyStatement
            }

        };

        return service;
    }





})();