
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
        'allSettingsService',
        '$timeout',
        'observerService',
        'EventIdentifier',
        'MoodedSearchCriteria'

    ];

    function userProfilerService(
        $q,
        ErrorIdentifier,
        GenericTrack,
        MoodedPlaylist,
        StatementCriteria,
        dataApiService,
        allSettingsService,
        $timeout,
        observerService,
        EventIdentifier,
        MoodedSearchCriteria


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


        var g_firstBegin = true;
        var g_arrayMoodedPlaylists = [];
        var g_currentPlaylist = null;
        var g_dictMoodedPlaylists = {};
        var g_arrayTrackHistory = [];
        var g_trackStartTime_ms = null;
        var g_numSkips = 0;

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




        function asyncObserveCurrentTrack(moodSuitable){
            var currentTime = new Date().getTime();
            var trackTime_ms = currentTime - g_trackStartTime_ms;
            var mood = g_currentPlaylist.getMoodId();
            var genericTrack = g_currentPlaylist.getGenericTracks()[g_currentPlaylist.currentTrackIndex];
            var trackDuration_ms = genericTrack.getDuration_s() * 1000;
            var numRepeats = genericTrack.numRepeats; //  we added this in prepareMoodedPlaylists
            var trackPercent = 100;


            if(trackTime_ms < trackDuration_ms ){
                trackPercent = (trackTime_ms *  100 / trackDuration_ms);
            }

            return observerService.asyncCreateObservation(mood, moodSuitable, trackPercent, numRepeats, genericTrack);

        }


        function asyncInitialise(returnsAnEventHandlingPromise) {

            if (returnsAnEventHandlingPromise) {
                EVENT_HANDLER_PROMISE = returnsAnEventHandlingPromise;
            } else {
                throw (ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "User Profiler Service needs a function returning a promise which will handle change events (new playlists). See EventIdentifier"))
            }


            var deferred = $q.defer();
            var promises = [];


            $timeout(

                function () {

                    promises.push(allSettingsService.asyncGet(SETTINGS.MAX_SKIP_COUNT.id));
                    promises.push(allSettingsService.asyncGet(SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S.id));

                    $q.all(promises).then(
                        function (results) {
                            SETTINGS.MAX_SKIP_COUNT.value = results[0];
                            SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S.value = results[1];
                        },
                        deferred.reject
                    );



                    deferred.resolve();

                }

            );


            return deferred.promise;

        }

        function flipMoodedPlaylists() {
            if (g_arrayMoodedPlaylists.length > 1) {
                if (g_currentPlaylist) {
                    try {
                        g_currentPlaylist = g_dictMoodedPlaylists[g_currentPlaylist.getMoodId().getIdAnti()];
                    } catch (e) {
                        console.log("userProfilerService.flipMoodedPlaylists: warning: expect anti-mood, but found error");
                    }
                }
            }
        }



        function markRepeat(){
            var genericTrack = g_currentPlaylist[g_currentPlaylist.currentTrackIndex];
            genericTrack.numRepeats += 1; // we added this in prepareMoodedPlaylists
        }

        function setNextTrack(increment) {
            var result = null;

            if (increment == null) {
                increment = 1;
            }

            try {
                g_trackStartTime_ms = new Date().getTime();
                g_currentPlaylist.currentTrackIndex += increment;
                var genericTrack = g_currentPlaylist.getGenericTracks()[g_currentPlaylist.currentTrackIndex];
                result = genericTrack;
            } catch (e) { } // no-op

            return result; // null if end.
        }


        function asyncOnTrackSkippedNext() {
            var deferred = $q.defer();
            $timeout(
                function () {
                    g_numSkips += 1;
                    asyncObserveCurrentTrack(false).then(
                        function () {
                            if (g_numSkips > SETTINGS.MAX_SKIP_COUNT) {
                                flipMoodedPlaylists();
                                g_numSkips = 0;
                            }
                            deferred.resolve(setNextTrack(0));
                        },
                        deferred.reject
                    );
                });
            return deferred.promise;
        }


        function asyncOnNextTrack() {
            var deferred = $q.defer();
            $timeout(
                function () {
                    asyncObserveCurrentTrack(true).then(
                        function () {
                            deferred.resolve(setNextTrack());
                        },
                        deferred.reject
                    );
                });
            return deferred.promise;
        }





        function asyncOnTrackSkippedPrev() {
            var deferred = $q.defer();
            $timeout(
                function () {
                    g_numSkips += 1;
                    asyncObserveCurrentTrack(false).then(
                        function () {
                            if (g_numSkips > SETTINGS.MAX_SKIP_COUNT) {
                                flipMoodedPlaylists();
                                g_numSkips = 0;
                            }
                            deferred.resolve(setNextTrack(-1));
                        },
                        deferred.reject
                    );
                });
            return deferred.promise;
        }


        function asyncOnPrevTrack() {
            var deferred = $q.defer();
            $timeout(
                function () {
                    asyncObserveCurrentTrack(true).then(
                        function () {
                            deferred.resolve(setNextTrack(-1));
                        },
                        deferred.reject
                    );
                });
            return deferred.promise;
        }



        // --- player

        // use next to go to the next track, while playing, or when the current track has completed. You need to have used begin at least once first.
        function asyncNext() {

            if (g_trackStartTime_ms == null) {
                throw ("userProfilerService.asyncNext: use asyncBegin on a new playlist");
            } else {
                var currentTime_ms = new Date().getTime();
                if ((currentTime_ms - g_trackStartTime_ms) < (SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S * 1000)) {
                    return asyncOnTrackSkippedNext();
                } else {
                    return asyncOnNextTrack();
                }
            }


        }

        // use previous to go to the previous track, while playling, or when the current track has completed. You need to have used begin at least once first.
        function asyncPrev() {
            if (g_trackStartTime_ms == null) {
                throw ("userProfilerService.asyncPrev: use asyncBegin on a new playlist");
            } else {
                var currentTime_ms = new Date().getTime();
                if ((currentTime_ms - g_trackStartTime_ms) < (SETTINGS.MAX_TRACK_DURATION_FOR_SKIP_S * 1000)) {
                    return asyncOnTrackSkippedPrev();
                } else {
                    return asyncOnPrevTrack();
                }
            }
        }



        // use begin to start a playlist, or go to the begining of a track whilst playing (is a repeat)
        function asyncBegin() {

            var deferred = $q.defer();
            $timeout(
                function () {
                    if (g_firstBegin){
                        g_firstBegin = false;
                    }else{
                        markRepeat();
                    }
                    deferred.resolve(setNextTrack(0)); // increment as zero
                }
            );
            return deferred.promise;
        }

        // the current track is unplayable
        // mark it as bad, and recommend another
        function asyncTrackIsBadGetAnother() {
            var deferred = $q.defer();
            $timeout(
                function () {
                    var tracks = g_currentPlaylist.getGenericTracks();
                    tracks.splice(g_currentPlaylist.currentTrackIndex, 1);

                    deferred.resolve(setNextTrack(0)); // increment as zero
                }
            );
            return deferred.promise;
        }


        // --- Finder



        function rawObservationsToTrackIds(rawObservations) {
            var container = {};
            var result = [];

            rawObservations.forEach(

                function (rawObservation) {
                    var trackId = rawObservation.getTrackId();
                    var priority = rawObservation.getPriority();

                    if (trackId) {
                        // deduplicate the trackid, and make sure we get the correct priority for the track (1 is best)
                        if (container[priority] == null) {
                            container[priority] = {};
                        }
                        container[priority][trackid] = {};
                    }
                }
            );

            // container is now a dictionary of tracks and associated priorities.
            // push into results in order of priority
            Object.keys(container).forEach(
                function (priority) {
                    //rely on order of priority, not insertion, since these keys are integers
                    Object.getKeys(container[priority]).forEach(
                        function (trackId) {
                            result.push(trackId);
                        }
                    );
                }
            );

            return result;



        }


        function asyncLookupTrackIds(trackIds) {

            var deferred = $q.defer();

            var promises = [];

            trackIds.forEach(
                function (trackId) {
                    promises.push[dataApiService.asyncGetTrackFromId(trackId)];
                }
            );

            $q.all(promises).then(
                deferred.resolve
                ,
                deferred.reject
            );

            return deferred.promise;

        }


        function asyncFindPlaylist(moodId, timeStamp, location) {
            var deferred = $q.defer();
            observerService.asyncSeekObservations(moodId, timeStamp, location).then(
                function (rawObservations) {
                    var trackIds = rawObservationsToTrackIds(rawObservations);
                    asyncLookupTrackIds(trackIds).then(
                        function (genericTracks) {
                            var result = MoodedPlaylist.build(moodId, genericTracks);
                            deferred.resolve(result);
                        },
                        deferred.reject
                    );

                },
                deferred.reject

            );
            return deferred.promise;
        }




        function asyncFindPlaylists(moodedSearchCriteria) {
            var deferred = $q.defer();
            if (moodedSearchCriteria instanceof MoodedSearchCriteria) {

                $timeout(

                    function () {

                        var promises = [];
                        var moodIds = moodedSearchCriteria.getMoodIds();
                        var timeStamp = moodedSearchCriteria.getTimestamp();
                        var location = moodedSearchCriteria.getLocation();

                        moodIds.forEach(
                            function (moodId) {
                                promises.push(
                                    asyncFindPlaylist(moodId, timeStamp, location)
                                );
                            }
                        );
                        $q.all(promises).then(
                            deferred.resolve
                            ,
                            deferred.reject
                        );
                    }
                );
            } else {
                throw ("userProfiler.finder.asyncFindPlaylist: needs a MoodedSearchCriteria");
            }
            return deferred.promise;
        }

        function prepareMoodedPlaylists(arrayMoodedPlaylists) {
            arrayMoodedPlaylists.forEach(
                function (moodedPlaylist) {
                    moodedPlaylist.currentTrackIndex = 0; // we're adding this attribute

                    var genericTracks = moodedPlaylist.getGenericTracks();
                    if(genericTracks){

                        genericTracks.forEach(
                            function(genericTrack){
                                genericTrack.numRepeats = 0; // we're adding this attribute
                            }
                        );

                    }


                }
            );
        }

        function buildPlaylistDictionary(dictionary, arrayMoodedPlaylists) {
            if (arrayMoodedPlaylists) {
                if (dictionary) {
                    arrayMoodedPlaylists.forEach(
                        function (moodedPlaylist) {
                            var mood_id = moodedPlaylist.getMoodId().getId();
                            if (!dictionary[mood_id]) {
                                dictionary[mood_id] = moodedPlaylist;
                            } else {
                                console.log("userProfiler:buildPlaylistDictionary: warning: duplicated playlist?");
                                dictionary[mood_id].add(moodedPlaylist);
                            }
                        }
                    );
                } else {
                    throw ("userProfiler:buildPlaylistDictionary: no dictionary");
                }

            } else {
                console.log("userProfiler:buildPlaylistDictionary: warning: no playlists");
            }
        }

        function initialisePlaylists(arrayMoodedPlaylists) {

            g_firstBegin = true;
            g_arrayMoodedPlaylists = [];
            g_arrayTrackHistory = [];
            g_dictMoodedPlaylists = {};
            g_currentPlaylist = null;

            g_arrayMoodedPlaylists = arrayMoodedPlaylists;
            if (arrayMoodedPlaylists && arrayMoodedPlaylists.length > 0) {
                prepareMoodedPlaylists(arrayMoodedPlaylists);
                buildPlaylistDictionary(g_dictMoodedPlaylists, g_arrayMoodedPlaylists);
                g_currentPlaylist = arrayMoodedPlaylists[0];
            }
        }



        function initialiseCounters() {
            g_trackStartTime_ms = null;
            g_numSkips = 0;
        }



        // --- Loader

        function asyncLoadMoodedPlaylists(arrayMoodedPlaylists) {
            initialisePlaylists(arrayMoodedPlaylists);
            initialiseCounters();

            return asyncBroadcastEvent(EventIdentifier.build(EventIdentifier.PLAYLIST_NEW, null));
        }

        // --- Statement

        function asyncApplyStatement(statementCriteria) {
            var mood = null;
            var genericTrack = null;
            try {
                mood = statementCriteria.getMood();
                genericTrack = statementCriteria.getGenericTrack();
            } catch (e) {
                throw ("asyncApplyStatement: unexpected parameters: needs a MoodIdentifier and a GenericTrack.");
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