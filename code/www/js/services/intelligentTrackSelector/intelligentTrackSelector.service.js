(function () {
    'use strict';

    angular
        .module('gaddum.intelligenttrackselector')
        .factory('intelligentTrackSelector', intelligentTrackSelector);

    intelligentTrackSelector.$inject = [
        'ErrorIdentifier',
        'GenericTrack',
        'MoodedPlaylist',
        'StatementCriteria',
        'dataApiService',
        '$timeout',
        'moment'

    ];

    function intelligentTrackSelector(
        ErrorIdentifier,
        GenericTrack,
        MoodedPlaylist,
        StatementCriteria,
        dataApiService,
        $timeout,
        moment
    ) {


        var m_moodToPlayList = undefined;
        var m_moodId = undefined;
        var m_trackSkipCount = undefined;
        var m_timeOfLastSkip = undefined;
        var m_currentTrackIndex = undefined;
        var m_supportedMoodIds = undefined;

        var SETTINGS = {
            MAX_SKIP_COUNT: {
                id: 'track_selector_max_skips',
                value: 0
            },
            MAX_TRACK_DURATION_FOR_SKIP_S: {
                id: 'track_selector_max_track_duration_for_skip_s',
                value: 0
            },
        };




        // makes a dictionary of moodIds, with associated empty playlists
        function initialiseMoodedPlaylists(supportedMoodIds) {
            m_moodToPlayList = {};
            supportedMoodIds.forEach(function (supportedMoodId) {
                var id = supportedMoodId.getId();
                m_moodToPlayList = {};

                m_moodToPlaylist[id] = MoodedPlaylist.build(
                    supportedMoodId,
                    Playlist.build()
                );

            });
        }

        function asyncInitialiseMoodedPlaylists(supportedMoodIds) {
            var deferred = $q.defer();

            $timeout(

                function () {
                    initialiseMoodedPlaylist(supportedMoodIds);
                    deferred.resolve();

                }
            );

            return deferred.promise();
        }


        function asyncInitialiseSettings() {
            var deferred = $q.defer();

            var promises = [];

            promises.push(dataApiService.asyncGetSetting(SETTINGS.MAX_SKIP_COUNT.id));
            promises.push(dataApiService.asyncGetSetting(SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S.id));

            $q.all(promises).then(
                function (result) {
                    SETTINGS.MAX_SKIP_COUNT.value = result[0];
                    SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S = result[1];
                    deferred.resolve(result);
                },
                function (error) {
                    deferred.reject(error);
                }
            );


        }

        function asyncInitialise(supportedMoodIds) {
            var m_moodToPlayList = null;
            var m_moodId = null;
            var m_trackSkipCount = 0;
            var m_timeOfLastSkip = null;
            var m_currentTrackIndex = 0;
            return asyncInitialiseMoodedPlaylists(supportedMoodIds);
        }


        function isTimeASkip(currentTimeAsDate){
            var result = false;
            var current = moment(currentTimeAsDate);
            var start = moment(m_timeOfLastSkip)
            var diff_s = moment.duration(current.diff(start)).asSeconds();
            if(diff_s > SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S.value){
                result = true;
            } 
            return result;
        }

        // --- player

        function resetCounters() {
            var m_moodId = m_moodedPlaylists[0].getMoodId().getId();
            var m_trackSkipCount = 0;
            var m_timeOfLastSkip = moment();
            var m_currentTrackIndex = 0;
        }


        function selectTrack(){

        }




        function getNext() {
            if(isTimeASkip()){
                if(m_trackSkipCount > SETTINGS.MAX_SKIP_COUNT.value){
                    makeObservation(currentTrack,);
                }
            }
        }


        function asyncNext() {
            $timeout(
                function () {

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
                function () {
                    resolve(GenericTrack.build(
                        'Lilly of the Valley',
                        'Sheer Heart Attack',
                        'Queen'
                    ));
                }
            );
        }

        function begin() {
            resetCounters();
            return selectTrack();
        }


        function asyncBegin() {
            $timeout(
                function () {
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
                function () {
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


        // converts an array of mooded playlists into a lookup
        // expects the array to possibly contain multiple mooded playlists having the same mood type. 
        // If this is the case, the playlists are collated.
        // structure looks like:
        // {
        //   mood_id : {
        //       * your mooded playlist *
        //   }
        // }
        function convertArrayToLookup(moodedPlaylists) {
            result = {};

            if (moodedPlaylists) {
                moodedPlaylists.forEach(function (incoming) {
                    var id = incoming.getMoodId().getId();
                    var incumbent = result[id];
                    if (!result[id]) {
                        result[id] = moodedPlaylist;
                    } else {
                        incumbent.getPlaylist().add(incoming.getPlaylist());
                    }
                });
            }

            return result;
        }


        function loadUserSelectedMoodedPlaylists(moodedPlaylists) {

            m_moodedPlaylists = [];
            m_moodToPlaylist = {};

            if (moodedPlaylists) {
                m_moodedPlaylists = moodedPlaylists;
                m_moodToPlayList = convertArrayToLookup();
            } else {
                //do nothing
            }
        }




        function asyncLoadMoodedPlaylists(moodedPlaylists) {
            var deferred = $q.defer();

            $timeout(function () {
                try {
                    initialiseMoodedPlaylist();
                    loadUserSelectedMoodedPlaylists(moodedPlaylists);
                    resolve();
                } catch (e) {
                    reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, e.message));
                }
            });
            return deferred.promise;

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