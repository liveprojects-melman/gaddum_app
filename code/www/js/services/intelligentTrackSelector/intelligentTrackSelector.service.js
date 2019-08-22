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

        var MAX_SKIP_COUNT = null;
        var SKIP_THRESHOLD_S = null;
        var SUPPORTED_MOOD_IDS = null;
        var MOOD_ID_TRACK_LOOKUP = null;

        var m_currentMoodId = null;
        var m_trackSkipCount = 0;
        var m_timeOfLastSkip = null;


        var m_trackHistory = [];

        function createTrackList() {
            var result = {};

            result.trackIndex = 0;
            result.genericTracks = [];

            return result;
        }

        function createHistoryEntry(moodId, trackIndex){
            return {
                mood: moodId,
                index: trackIndex
            }
        }

        function clearHistory(){
            m_trackHistory = [];
        }

        function addHistory(moodId, trackIndex){
            m_trackHistory.push(createHistoryEntry(moodId, trackIndex)); 
        }


        // makes a dictionary of moodIds, with associated empty playlists
        function createMoodIdTrackLookup(supportedMoodIds) {
            var result = {};
            supportedMoodIds.forEach(function (supportedMoodId) {
                var id = supportedMoodId.getId();
                result[id].anti = supportedMoodId.getIdAnti(); // mood to flip to
                result[id].list = createTrackList();

            });
            return result;
        }

        function addToTrackLookup(moodedPlaylists, lookup){

            moodedPlaylists.forEach(
                function (moodedPlayList) {

                    var id = moodedPlaylist.getMoodId().getId();

                    lookup[id].anti = moodedPlaylist.getMoodId().getIdAnti();
                    lookup[id].list.trackIndex = 0;
                    var array = lookup[id].list.genericTracks;
                    array = array.concat(moodedPlaylist.getGenericTracks());
                    lookup[id].list.genericTracks = array;

                }
            );
            return lookup;
        }

        

        function initialise(supportedMoodIds, maxSkipCount, skipThreshold_s) {

            MAX_SKIP_COUNT = maxSkipCount;
            SKIP_THRESHOLD_S = skipThreshold_s;
            SUPPORTED_MOOD_IDS = supportedMoodIds;
            

            var m_moodId = null;
            var m_trackSkipCount = 0;
            var m_timeOfLastSkip = null;

        }


        function isTimeASkip(currentTimeAsDate) {
            var result = false;
            var current = moment(currentTimeAsDate);
            var start = moment(m_timeOfLastSkip)
            var diff_s = moment.duration(current.diff(start)).asSeconds();
            if (diff_s > SKIP_THRESHOLD_S) {
                result = true;
            }
            return result;
        }


        // --- player

        function resetCounters() {
            var m_trackSkipCount = 0;
            var m_timeOfLastSkip = moment();
        }







        function next() {
            if (isTimeASkip()) {
                if (m_trackSkipCount > MAX_SKIP_COUNT) {
                    
                }
            }
        }


        function prev() {
            if(isTimeASkip()){

            }
         }




        function loadMoodedPlaylists(moodedPlaylists) {
            resetCounters();
            resetHistory();
            MOOD_ID_TRACK_LOOKUP = createMoodIdTrackLookup(SUPPORTED_MOOD_IDS);
            addToTrackLookup(moodedPlaylists,MOOD_ID_TRACK_LOOKUP);
            setCurrentMood(moodedPlaylist[0].getMoodId().getId());
        }

        var service = {
            initialise: initialise,
            loadMoodedPlaylists: loadMoodedPlaylists,
            next: next,
            prev: prev


        };

        return service;
    }





})();
