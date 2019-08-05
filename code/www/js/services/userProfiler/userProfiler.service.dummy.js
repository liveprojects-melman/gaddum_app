
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



        function initialise(){


            
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

        function asyncLoadMoodedPlaylists(moodedPlaylist) {

            console.log("Mooded Playlist",moodedPlaylist);


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