
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
        '$timeout'

    ];

    function userProfilerService(
        ErrorIdentifier,
        GenericTrack,
        MoodedPlaylist,
        StatementCriteria,
        dataApiService,
        $timeout
    ) {

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


        function initialise(){

            //promises.push(dataApiService.asyncGetSetting(SETTINGS.MAX_SKIP_COUNT.id));
            //promises.push(dataApiService.asyncGetSetting(SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S.id));
            
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

            console.log("Mooded Playlist",arrayMoodedPlaylists);


        }

        // --- Statement

        function asyncApplyStatement() {
        }

        var service = {
            initialise,
            player: {
                asyncNext: asyncNext,
                asyncPrev: asyncPrev,
                asyncBegin: asyncBegin,
                asyncComplete: asyncComplete
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