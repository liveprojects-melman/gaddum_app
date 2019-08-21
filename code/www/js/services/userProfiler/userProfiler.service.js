
(function () {
    'use strict';

    angular
        .module('gaddum.userprofiler')
        .factory('userProfilerService', userProfilerService);

    userProfilerService.$inject = [
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
            $timeout(
                function(){

                    resolve(GenericTrack.build(
                        'Killer Queen',
                        'Sheer Heart Attack',
                        'Queen'
                    ));
                }
            );
        }

        function asyncPrev() {
            $timeout(
                function(){
                    resolve(GenericTrack.build(
                        'Lilly of the Valley',
                        'Sheer Heart Attack',
                        'Queen'
                    ));
                }
            );
        }

        function asyncBegin() {
            $timeout(
                function(){
                    resolve(GenericTrack.build(
                        'Now I\'m Here',
                        'Sheer Heart Attack',
                        'Queen'
                    ));
                }
            );
        }

        function asyncComplete() {
            $timeout(
                function(){
                    resolve(GenericTrack.build(
                        'Now I\'m Here',
                        'Sheer Heart Attack',
                        'Queen'
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
                asyncPrev: asyncPrev
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