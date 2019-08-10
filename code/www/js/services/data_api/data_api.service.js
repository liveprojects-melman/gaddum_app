(function () {
    'use strict';

    angular
        .module('dataapijs')
        .factory('dataApiService', dataApiService);

    dataApiService.$inject = [
        '$q',
        'mappingService',
        'utilitiesService',
        'PlaylistIdentifier',
        'GenericTrack',
        'MusicProviderIdentifier'
    ];

    function dataApiService(
        $q,
        mappingService,
        utilitiesService,
        PlaylistIdentifier,
        GenericTrack,
        MusicProviderIdentifier
    ) {




        var asyncGetSupportedMusicProviders = function () {
            var deferred = $q.defer();

            mappingService.query("get_supported_music_providers", {},
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length > 0) {

                        var results = [];
                        rows.forEach(function (row) {
                            results.push(MusicProviderIdentifier.buildFromObject(row));
                        });
                        deferred.resolve(results);

                    } else {
                        deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "no music providers found."));
                    }
                }
                ,
                deferred.reject
            );



            return deferred.promise;
        };


        function asyncGetSelectedMusicProvider() {
            var deferred = $q.defer();
            mappingService.query(
                "get_selected_music_provider",
                {},
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length > 0) {
                        deferred.resolve(MusicProviderIdentifier.buildFromObject(rows[0]));
                    } else {
                        deferred.resolve(null);
                    }
                }
                ,
                function (error) {
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "asyncCreateProviderSetting: problem accessing db: " + error.message));
                }
            );

            return deferred.promise;
        }

        function asyncSetSelectedMusicProvider(musicProviderIdentifier) {
            if (musicProviderIdentifier) {
                return asyncSetSetting('music_provider_id', musicProviderIdentifier.getId(), 'string');
            } else {
                return asyncClearSetting('music_provider_id', 'string');
            }
        }

        var getBase64Resource = function (resource_id, success, fail) {
            if (resource_id) {
                mappingService.query("base64_resource", { resource_id: resource_id },
                    function (result) {
                        var rows = mappingService.getResponses(result.rows);
                        if (rows.length > 0) {
                            success(rows[0])
                        } else {
                            fail("no resource for id");
                        }
                    }
                    , fail);
            } else {
                success(null);
            }
        }


        function getSupportedMoodIds(fnSuccess, fnFail) {

            mappingService.query("get_supported_mood_ids", {},
                function (response) {

                    var rows = mappingService.getResponses(response.rows);
                    if (rows.length > 0) {
                        fnSuccess(rows);
                    } else {
                        fnFail("no supported moods!");
                    }
                }
                , fnFail);
        }



        function asyncGetSupportedMoodIds() {
            var d = $q.defer();
            getSupportedMoodIds(
                function (res) {
                    d.resolve(res);
                },
                function (err) {
                    d.reject(err);
                });
            return d.promise;
        }


        function getSupportedTimeSlots(fnSuccess, fnFail) {

            mappingService.query("get_supported_time_slots", {},
                function (response) {
                    var result = [];
                    var rows = mappingService.getResponses(response.rows);
                    if (rows.length > 0) {
                        fnSuccess(rows);
                    } else {
                        fnFail("no supported time slots!");
                    }
                }
                , fnFail);
        }



        function asyncGetSupportedTimeSlots() {
            var d = $q.defer();
            getSupportedTimeSlots(
                function (res) {
                    d.resolve(res);
                },
                function (err) {
                    d.reject(err);
                });
            return d.promise;
        }



        function asyncGetMoodDetectionParameters(mood_id) {
            var d = $q.defer();
            getMoodDetectionParameters(mood_id, function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }


        function getMoodDetectionParameters(mood_id, fnSuccess, fnFail) {
            mappingService.query("get_mood_detection_parameters", { mood_id: mood_id },
                function (response) {
                    var result = {};
                    var rows = mappingService.getResponses(response.rows);

                    // returns us a row from the database which we will assume contains at least the columns:
                    // mood
                    // criteria
                    // anything else we will just pass stright through to the client, as parameters.

                    if (rows.length > 0) {
                        // we have parameters associated with the mood


                        rows.forEach(function (row) {
                            result[row.criteria] = row; // put all the row data into an attribute for the parameter. client gets everything.
                        });

                    } else {
                        console.log("WARN: no parameters for the mood. It won't be detected. id: " + mood_id);
                    }
                    fnSuccess(result);
                }
                , fnFail);
        }


        function moodIdToResources(id, fnSuccess, fnFail) {

            mappingService.query("mood_id_to_resources", { mood_id: id },
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length == 1) {
                        fnSuccess(rows[0]);
                    } else {
                        fnFail("mood not found!");
                    }
                }
                , fnFail);
        }



        function asyncMoodIdToResources(id) {
            var d = $q.defer();
            moodIdToResources(id, function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }


        function getUserSettings(fnSuccess, fnFail) {

            mappingService.query("get_user_settings", {},
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length > 0) {
                        fnSuccess(rows);
                    } else {
                        fnFail("no supported user settings!");
                    }
                }
                , fnFail);
        }



        function asyncGetUserSettings() {
            var d = $q.defer();
            getUserSettings(function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }


        function getAllSettings() {
            mappingService.query("get_settings", {},
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length > 0) {
                        fnSuccess(rows);
                    } else {
                        fnFail("no supported settings!");
                    }
                }
                , fnFail);
        }

        function asyncGetAllSettings() {
            var d = $q.defer();
            getAllSettings(function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }

        function getSetting(id, fnSuccess, fnFail) {

            mappingService.query("get_setting", { id: id },
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length == 1) {

                        var candidate = rows[0];
                        var value = candidate.value; // default is 'string'
                        if (candidate.value_type === 'integer') {
                            value = parseInt(candidate.value);
                        } else if (candidate.value_type == 'boolean') {
                            if (candidate.value == 'true') {
                                value = true;
                            } else {
                                value = false;
                            }
                        }


                        fnSuccess(value);
                    } else {
                        fnFail("setting not found!");
                    }
                }
                , fnFail);
        }

        function asyncGetSetting(id) {
            var d = $q.defer();
            getSetting(id,
                function (res) {
                    d.resolve(res);
                },
                function (err) {
                    d.reject(err);
                });
            return d.promise;
        }

        function setSetting(id, value, type, fnSuccess, fnFail) {

            mappingService.query(
                "set_setting",
                { id: id, value: value, value_type: type },
                fnSuccess,
                fnFail);
        }


        function asyncSetSetting(id, value, type) {
            var d = $q.defer();
            setSetting(id, value, type, function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }

        function clearSetting(id, type, fnSuccess, fnFail) {

            mappingService.query(
                "clear_setting",
                { id: id, value_type: type },
                fnSuccess,
                fnFail);
        }


        function asyncClearSetting(id, type) {
            var d = $q.defer();
            clearSetting(id, type, function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }


        function asyncGetAllProviderSettings(provider_id) {
            var deferred = $q.defer();

            mappingService.query(
                "get_all_provider_settings",
                {
                    provider_id: provider_id
                },
                function (result) {
                    var rows = mappingService.getResponses(result.rows);

                    deferred.resolve(rows);

                }
                ,
                function (error) {
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "asyncGetProviderSetting: problem accessing db: " + error.message));
                }
            );
            return deferred.promise;
        }


        function asyncGetProviderSetting(provider_id, setting_id) {
            var deferred = $q.defer();

            mappingService.query(
                "get_provider_setting",
                {
                    provider_id: provider_id,
                    setting_id: setting_id
                },
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length == 1) {
                        var candidate = rows[0];
                        var value = candidate.value; // default is 'string'
                        if (candidate.value_type === 'integer') {
                            value = parseInt(candidate.value);
                        } else if (candidate.value_type == 'boolean') {
                            if (candidate.value == 'true') {
                                value = true;
                            } else {
                                value = false;
                            }
                        }
                        deferred.resolve(value);
                    } else {
                        deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "asyncGetProviderSetting: setting not found!"));
                    }
                }
                ,
                function (error) {
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "asyncGetProviderSetting: problem accessing db: " + error.message));
                }
            );
            return deferred.promise;
        }

        function asyncSetProviderSetting(provider_id, setting_id, value) {
            var deferred = $q.defer();

            mappingService.query(
                "set_provider_setting",
                {
                    provider_id: provider_id,
                    setting_id: setting_id,
                    value: value
                },
                deferred.resolve,
                function (error) {
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "asyncSetProviderSetting: problem accessing db: " + error.message));
                }
            );
            return deferred.promise;
        }

        function asyncClearProviderSetting(provider_id, setting_id) {
            var deferred = $q.defer();

            mappingService.query(
                "clear_provider_setting",
                {
                    provider_id: provider_id,
                    setting_id: setting_id
                },
                deferred.resolve
                ,
                function (error) {
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "clearProviderSetting: problem accessing db: " + error.message));
                }
            );
            return deferred.promise;
        }

        function asyncCreateProviderSetting(provider_id, setting_id, value, value_type) {
            mappingService.query(
                "create_provider_setting",
                {
                    provider_id: provider_id,
                    setting_id: setting_id,
                    value: value,
                    value_type: value_type
                },
                deferred.resolve,
                function (error) {
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "asyncCreateProviderSetting: problem accessing db: " + error.message));
                }
            );
        }

        function getSupportedInputTypes(fnSuccess, fnFail) {

            mappingService.query("get_supported_input_types", {},
                function (result) {
                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length > 0) {
                        fnSuccess(rows);
                    } else {
                        fnFail("no supported input types!");
                    }
                }
                , fnFail);
        }



        function asyncGetSupportedInputTypes() {
            var d = $q.defer();
            getSupportedInputTypes(function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }


        function getNumUnsetUserSettings(fnSuccess) {

            mappingService.query("get_num_unset_user_settings", {},
                function (result) {

                    var rows = mappingService.getResponses(result.rows);
                    if (rows.length > 0) {
                        fnSuccess(rows[0]);
                    } else {
                        fnSuccess(0);
                    }
                }
                , function (error) {
                    console.log("warning: getNumUnsetUserSettings threw error: " + JSON.stringify(error));
                    fnSuccess(0);
                });
        }



        function asyncGetNumUnsetUserSettings() {
            var d = $q.defer();
            getNumUnsetUserSettings(function (res) { d.resolve(res); }, function (err) { d.reject(err); });
            return d.promise;
        }



        function asyncSeekTracks(name, album, artist, id) {
            var deferred = $q.defer();

            mappingService.query(
                "seek_track",
                {
                    name: name,
                    album: album,
                    artist: artist,
                    id: id
                },
                function (items) {
                    var results = [];
                    if (items) {
                        items.forEach(
                            function (item) {
                                results.push(GenericTrack.buildFromObject(item));
                            }
                        );
                    }
                    deferred.resolve(results);
                },
                deferred.reject
            );

            return deferred.promise;

        }


        function asyncGetTracks(genericTrack) {
            var deferred = $q.defer();

            mappingService.query(
                "get_tracks",
                {
                    name: genericTrack.getName(),
                    album: genericTrack.getAlbum(),
                    artist: genericTrack.getArtist(),
                    duration_s: genericTrack.getDuration_s(),
                    id: genericTrack.getId();
                },
                function (items) {
                    var results = [];
                    if (items) {
                        items.forEach(
                            function (item) {
                                results.push(GenericTrack.buildFromObject(item));
                            }
                        );
                    }
                    deferred.resolve(results);
                },
                deferred.reject
            );

            return deferred.promise;

        }


        function asyncSeekPlaylists(name, id) {
            var deferred = $q.defer();

            mappingService.query(
                "seek_playlists",
                {
                    name: name,
                    id: id
                },
                function (items) {
                    var results = [];
                    if (items) {
                        items.forEach(
                            function (item) {
                                results.push(PlaylistIdentifier.buildFromObject(item));
                            }
                        );
                    }
                    deferred.resolve(results);
                },
                deferred.reject
            );

            return deferred.promise;

        }


        function asyncGetPlaylists(name, id) {
            var deferred = $q.defer();

            mappingService.query(
                "get_playlist",
                {
                    name: name,
                    id: id
                },
                function onSuccess(items) {
                    var results = [];
                    if (items) {
                        items.forEach(
                            function (item) {
                                results.push(PlaylistIdentifier.buildFromObject(item));
                            }
                        );
                    }
                    deferred.resolve(results);
                },
                deferred.reject
            );

            return deferred.promise;

        }

        // update / create a playlist
        function asyncDoSetPlaylist(name, id) {
            var deferred = $q.defer();

            mappingService.query("create_playlist", {
                name: name,
                id: id
            },
                function () {
                    // cannot return the result of an insert, like Postgres, so have to search for the id of the object we created.
                    mappingService.query(
                        "set_playlist",
                        {
                            name: name,
                            id: id
                        },
                        function (response) {

                            if (response && (response.length > 0)) {
                                // we rely on the default build to set flags like isGift and moodEnabled appropriately
                                var result = PlaylistIdentifier.buildFromObject(response[0]);
                                deferred.resolve(result);
                            } else {
                                deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "failed to create playlist object"));
                            }
                        },
                        deferred.reject
                    );
                },
                deferred.reject
            );

            return deferred.promise;
        }


        function asyncCreatePlaylist(name) {
            return asyncDoSetPlaylist(
                name,
                utilitiesService.createUuid()
            );
        }

        function asyncSetPlaylist(playlistIndentifier) {
            //TODO:  Handle other flags in playlist identifier, which handle gifts and moodenable
            return asyncDoSetPlaylist(
                playlistIdentifier.getName(),
                playlistIdentifier.getId()
            );
        }


        function asyncDoImportGenericTrack(genericTrack) {

            var deferred = $q.defer();



            mappingService.query("import_generic_track", {
                id: genericTrack.getId(),
                name: genericTrack.getName(),
                album: genericTrack.getAlbum(),
                artist: genericTrack.getArtist(),
                duration_s: genericTrack.getDuration_s()
            },
                function () {
                    deferred.resolve(genericTrack);
                },
                deferred.reject
            );

            return deferred.promise;

        }

        // pushes a generic track object into the DB
        // - ignores its Id
        // - searches comprehensively for an exact match on name, artist, album, duration_s 
        function asyncImportGenericTrack(genericTrack) {
            var deferred = $q.defer();
            // do we already have this track?

            asyncGetTracks(genericTrack).then(
                function (results) {
                    var incumbent = null;
                    if (results && results.length > 0) {
                        var incumbent = results[0];
                    }
                    if (incumbent) {
                        genericTrack.id = incumbent.getId();
                    } else {
                        genericTrack.id = utilitiesService.createUuid();
                    }
                    // this allows us to replace any extra data other than what we searched on.  
                    asyncDoImportGenericTrack(genericTrack).then(
                        deferred.resolve,
                        deferred.reject
                    );

                },
                deferred.reject
            )
            return deferred.promise;

        }

        function asyncGetTrackReferences(trackReference) {
            var deferred = $q.defer();

            mappingService.query(
                "get_track_references",
                {
                    id: trackReference.getId(),
                    provider_id: trackReference.getProviderId(),
                    track_id: trackReference.getTrackId()
                },
                function (items) {
                    var results = [];
                    if (items) {
                        items.forEach(
                            function (item) {
                                results.push(TrackReference.buildFromObject(item));
                            }
                        );
                    }
                    deferred.resolve(results);
                },
                deferred.reject
            );

            return deferred.promise;

        }

        function asyncDoImportTrackReference(trackReference) {

            var deferred = $q.defer();

            mappingService.query("import_generic_track", {
                id: trackReference.getId(),
                web_uri: trackReference.getName(),
                player_uri: trackReference.getAlbum(),
                thumbnail_uri: trackReference.getArtist(),
                track_id: trackReference.getDuration_s()
            },
                function () {
                    deferred.resolve(trackReference);
                },
                deferred.reject
            );

            return deferred.promise;
        }

        // pushes a track reference object into the DB
        // ignores its Id
        // searches comprehensivly for an exact match to GenericTrackId and musicServiceProvider 
        function asyncImportTrackReference(trackReference) {

            var deferred = $q.defer();
            // do we already have this track reference?

            asyncGetTrackReferences(trackReference).then(
                function (results) {
                    var incumbent = null;
                    if (results && results.length > 0) {
                        var incumbent = results[0];
                    }
                    if (incumbent) {
                        trackReference.id = incumbent.getId();
                    } else {
                        trackReference.id = utilitiesService.createUuid();
                    }
                    // this allows us to replace any extra data other than what we searched on.  
                    asyncDoImportGenericTrack(trackReference).then(
                        deferred.resolve,
                        deferred.reject
                    );

                },
                deferred.reject
            )
            return deferred.promise;
        }

        function asyncImportArtwork(cachedImage) {

            var deferred = $q.defer();

            mappingService.query("import_artwork", {
                web_uri: cachedImage.getWebUri(),
                base64_image: cachedImage.getBase64Image()
            },
                function () {
                    deferred.resolve(cachedImage);
                },
                deferred.reject
            );

            return deferred.promise;


        }


        // beware! creates a generic track ready for inclusion in DB. It has no Id
        function toGenericTrack(trackInfo){
            var result = null;
            if(trackInfo){ 
            GenericTrack.build(
                null, 
                trackInfo.getName(), 
                trackInfo.getAlbum(), 
                trackInfo.getArtist(), 
                trackInfo.getDuration_s()
                );
            }
            return result;
        }

        // beware! must use a generic track from the DB. This will have an Id.
        // beware! creates a TrackReference ready for inclusion in DB. It has no id.
        function toTrackReference(genericTrack, trackInfo, musicProviderIdentifier){
            var result = null;
            if(genericTrack && trackInfo && musicProviderIdentifier){
                if(!genericTrack.id){
                    throw("toTrackReference: generic track without id");
                }
                result = TrackReference.build(
                    null,
                    trackInfo.getWebUri(), 
                    trackInfo.getPlayerUri(),
                    trackInfo.getThumbnailUri(), 
                    musicProviderIdentifier.getId(), 
                    genericTrack.getId());
            }else{
                throw("toTrackReference: parameters are missing.");
            }
            return result;
        }


        function toGenericImportTrack(genericTrack, trackReference){
            var result = null;
            if(genericTrack && trackReference){
            result =  GenericImportTrack.build(
                genericTrack.getName(), 
                genericTrack.getAlbum(), 
                genericTrack,getArtist(),
                trackReference.getPlayerUri(), 
                trackReference.getThumbnailUri());
            }else{
                throw("toGenericImportTrack: parameters are missing.");
            }

            return result;
        }


        // imports the track info object associated with the music provider.
        // optionally associates a thumbnail image if one is included in the track info.
        // returns a GenericImportTrack.
        function asyncImportTrackInfo(trackInfo,   musicProviderIdentifier, base64EncodedThumbnail) {

            var deferred = $q.defer();

            if(trackInfo && musicProviderIdentifier){

            var genericTrack = toGenericTrack(trackInfo);

            asyncImportGenericTrack(genericTrack).then(
                function(storedGenericTrack){
                    var trackReference = toTrackReference(
                        storedGenericTrack,
                        trackInfo,
                        musicProviderIdentifier
                    );
                    asyncImportTrackReference(trackReference).then(
                        function(storedTrackReference){
                            var genericImportTrack = toGenericImportTrack(storedGenericTrack, storedTrackReference);
                            var thumbnailUrl = trackInfo.getThumbnailUrl();
                            if(base64EncodedThumbnail && thumbnailUrl){
                                    asyncImportArtwork(CachedImage.build(thumbnailUrl,base64EncodedThumbnail)).then(
                                        function(cachedImage){
                                            deferred.resolve(genericImportTrack);
                                        },
                                        deferred.reject
                                    )
                                
                            }else{
                                deferred.resolve(genericImportTrack);
                            }
                        },
                        deferred.reject
                    )

                },
                deferred.reject
            );

            }else{
                throw("asyncImportTrackInfo: parameters are missing.");
            }

            return $q.deferred();

        }


        // "id": "82fb1b6e-cca0-4ff5-b85a-a8d708fb8d7c",
        // "timestamp_s": "1565165883",
        // "mood_id" : "physical",// MAY BE NULL
        // "timeslot": 3,
        // "location_lat" : 53.5041, // MAY BE NULL
        // "location_lon": -2.1910,// MAY BE NULL
        // "location_code" : "M1 5GD", // MAY BE NULL
        // "track_percent" : 68,
        // "num_repeats" : 4,
        // "mood_suitable" : true,
        // "track": "467f79eb-969d-4ab0-8869-b915a9491c0d" // MAY BE NULL


        function addObservation(
            id,
            timestamp_s,
            mood_id,
            timeSlot,
            location_lat,
            location_lon,
            location_code,
            track_percent,
            num_repeats,
            mood_suitable,
            track,
            fnSuccess,
            fnFail
        ) {
            mappingService.query("add_observation", {
                id,
                timestamp_s,
                mood_id,
                timeSlot,
                location_lat,
                location_lon,
                location_code,
                track_percent,
                num_repeats,
                mood_suitable,
                track,
            },
                function (result) {
                    fnSuccess(result);
                }
                , fnFail);
        }

        function asyncAddObservation(observation) {
            var deferred = $q.defer();

            $timeout(
                function () {
                    if (observation) {
                        var id = observation.getId();
                        var timestamp_s = observation.getTimeStamp().getJavaEpocS();
                        var mood = observation.getMood();
                        var mood_id = mood ? mood.getId() : null;
                        var timeSlot = observation.getTimeSlot().getId();

                        var location = observation.getLocation();
                        var location_lat = location ? location.getLat() : null;
                        var location_lon = location ? location.getLon() : null;

                        var postcode = observation.getPostcode();
                        var location_code = postcode ? postcode.getPostcode() : null;

                        var track_percent = observation.getTrackPercent();
                        var num_repeats = observation.getNumRepeats();
                        var mood_suitable = observation.isMoodSuitable();

                        var genericTrack = observation.getTrack();
                        var track = genericTrack ? genericTrack.getId() : null;

                        addObservation(
                            id,
                            timestamp_s,
                            mood_id,
                            timeSlot,
                            location_lat,
                            location_lon,
                            location_code,
                            track_percent,
                            num_repeats,
                            mood_suitable,
                            track,
                            function fnOnSuccess() {
                                deferred.resolve(observation)
                            },
                            function fnOnError(error) {
                                deferred.reject(error)
                            }
                        )


                    } else {
                        deferred.resolve(null);
                    }
                }

            );

            return deferred.promise;
        }



        var service = {
            asyncGetSupportedMusicProviders: asyncGetSupportedMusicProviders,
            asyncGetSelectedMusicProvider: asyncGetSelectedMusicProvider,
            asyncSetSelectedMusicProvider: asyncSetSelectedMusicProvider,

            asyncGetSupportedMoodIds: asyncGetSupportedMoodIds,
            asyncGetMoodDetectionParameters: asyncGetMoodDetectionParameters,
            asyncMoodIdToResources: asyncMoodIdToResources,
            asyncGetSupportedInputTypes: asyncGetSupportedInputTypes,

            asyncGetUserSettings: asyncGetUserSettings,
            asyncGetNumUnsetUserSettings: asyncGetNumUnsetUserSettings,
            asyncGetAllSettings: asyncGetAllSettings,

            asyncSetSetting: asyncSetSetting,
            asyncGetSetting: asyncGetSetting,
            asyncClearSetting: asyncClearSetting,

            asyncGetAllProviderSettings: asyncGetAllProviderSettings,
            asyncCreateProviderSetting: asyncCreateProviderSetting,
            asyncGetProviderSetting: asyncGetProviderSetting,
            asyncSetProviderSetting: asyncSetProviderSetting,
            asyncClearProviderSetting: asyncClearProviderSetting,


            asyncAddObservation: asyncAddObservation,
            asyncSeekTracks: asyncSeekTracks,
            asyncSeekPlaylists: asyncSeekPlaylists,
            asyncGetTracks: asyncGetTracks,
            asyncGetPlaylists: asyncGetPlaylists,
            asyncCreatePlaylist: asyncCreatePlaylist,
            asyncSetPlaylist: asyncSetPlaylist,
            asyncImportTrackInfo: asyncImportTrackInfo

        };


        return service;
    }





})();






