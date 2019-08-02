--
-- File generated with SQLiteStudio v3.0.7 on Fri Aug 2 15:11:41 2019
--
-- Text encoding used: UTF-8
--
-- PRAGMA foreign_keys = off;
-- BEGIN TRANSACTION;

-- Table: supported_face_criteria
DROP TABLE IF EXISTS supported_face_criteria;

CREATE TABLE supported_face_criteria (
    id        TEXT   PRIMARY KEY
                     NOT NULL
                     UNIQUE,
    name      TEXT   NOT NULL,
    range_max DOUBLE,
    range_min DOUBLE
);

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'wink',
                                        'wink',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'cocked_eyebrow',
                                        'cocked eyebrow',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'lopsided_smile',
                                        'lopsided smile',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'smile',
                                        'smile',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'both_eyebrows_down',
                                        'both eyebrows down',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'both_eyebrows_up',
                                        'both eyebrows up',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'both_eyes_closed',
                                        'both eyes closed',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'any_eyebrows_down',
                                        'any eyebrows down',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'any_eyebrows_up',
                                        'any eyebrows up',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'any_eyes_closed',
                                        'any eyes closed',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'head_cocked',
                                        'head cocked (0 is centre, only + values)',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'rz',
                                        'head cocked-left-ness (0 is centre, left is more +)',
                                        1,
-                                       1
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'ry',
                                        'head right-ness (0 is centre, right is more +)',
                                        1,
-                                       1
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'rx',
                                        'head down-ness (0 is fully up, down is more +)',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'mouthNasty',
                                        'mouth nasty',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'eyeLeftClose',
                                        'eye left close',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'eyeRightClose',
                                        'eye right close',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'mouthRound',
                                        'mouth round',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'mouthOpen',
                                        'mouth open',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'eyeBrowRightUp',
                                        'eyebrow right up',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'eyeBrowLeftUp',
                                        'eyebrow left up',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'eyeBrowRightDown',
                                        'eyebrow right down',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'eyeBrowLeftDown',
                                        'eyebrow left down',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'smileLeft',
                                        'smile left',
                                        1,
                                        0
                                    );

INSERT INTO supported_face_criteria (
                                        id,
                                        name,
                                        range_max,
                                        range_min
                                    )
                                    VALUES (
                                        'smileRight',
                                        'smile right',
                                        1,
                                        0
                                    );


-- Table: tracks
DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks (
    id         TEXT    PRIMARY KEY
                       NOT NULL
                       UNIQUE,
    name       TEXT,
    album      TEXT,
    artist     TIME,
    duration_s INTEGER NOT NULL
);


-- Table: observations
DROP TABLE IF EXISTS observations;

CREATE TABLE observations (
    id            TEXT    PRIMARY KEY
                          UNIQUE
                          NOT NULL,
    timestamp_s   INTEGER NOT NULL,
    mood_id       INTEGER REFERENCES supported_moods (id) ON DELETE NO ACTION
                                                          ON UPDATE CASCADE
                                                          MATCH SIMPLE
                          NOT NULL,
    timeslot      INTEGER REFERENCES supported_timeslots (id) ON DELETE CASCADE
                                                              ON UPDATE CASCADE
                                                              MATCH SIMPLE
                          NOT NULL,
    location_lat  DOUBLE,
    location_lon  DOUBLE,
    location_code TIME,
    track_percent INTEGER NOT NULL,
    num_repeats   INTEGER NOT NULL,
    mood_suitable BOOLEAN NOT NULL,
    track         TEXT    REFERENCES tracks (id) ON DELETE CASCADE
                                                 ON UPDATE CASCADE
                                                 MATCH SIMPLE
);


-- Table: supported_input_types
DROP TABLE IF EXISTS supported_input_types;

CREATE TABLE supported_input_types (
    name TEXT PRIMARY KEY
            NOT NULL
            UNIQUE
);

INSERT INTO supported_input_types (
                                      name
                                  )
                                  VALUES (
                                      'boolean'
                                  );

INSERT INTO supported_input_types (
                                      name
                                  )
                                  VALUES (
                                      'integer'
                                  );

INSERT INTO supported_input_types (
                                      name
                                  )
                                  VALUES (
                                      'text'
                                  );


-- Table: playlists_to_tracks
DROP TABLE IF EXISTS playlists_to_tracks;

CREATE TABLE playlists_to_tracks (
    id          TEXT PRIMARY KEY
                     UNIQUE
                     NOT NULL,
    playlist_id TEXT REFERENCES playlists (id) ON DELETE CASCADE
                                               ON UPDATE CASCADE
                                               MATCH SIMPLE
                     NOT NULL,
    track_id    TEXT REFERENCES tracks (id) ON DELETE CASCADE
                                            ON UPDATE CASCADE
                                            MATCH SIMPLE
                     NOT NULL
);


-- Table: user_settings
DROP TABLE IF EXISTS user_settings;

CREATE TABLE user_settings (
    id                   TEXT NOT NULL
                              PRIMARY KEY
                              REFERENCES settings (id) ON DELETE CASCADE
                                                       ON UPDATE CASCADE
                                                       MATCH SIMPLE,
    friendly_name        TEXT,
    friendly_description TEXT,
    default_value        TEXT
);

INSERT INTO user_settings (
                              id,
                              friendly_name,
                              friendly_description,
                              default_value
                          )
                          VALUES (
                              'collection_play_history',
                              'Collect play history',
                              'Collect and store the tracks you play, and when you play them. On the device only.',
                              'false'
                          );

INSERT INTO user_settings (
                              id,
                              friendly_name,
                              friendly_description,
                              default_value
                          )
                          VALUES (
                              'collection_location_history',
                              'Collect location history',
                              'When collecting and storing the tracks you play, add where you played them. Stored on device only.',
                              'false'
                          );

INSERT INTO user_settings (
                              id,
                              friendly_name,
                              friendly_description,
                              default_value
                          )
                          VALUES (
                              'collection_mood_history',
                              'Collect mood history',
                              'When collecting and storing the tracks you play, add the mood you were in when you played them. Stored on device only.',
                              'false'
                          );

INSERT INTO user_settings (
                              id,
                              friendly_name,
                              friendly_description,
                              default_value
                          )
                          VALUES (
                              'sharing_play_history',
                              'Share play history',
                              'When sharing a track, also share when you have played it.',
                              'false'
                          );

INSERT INTO user_settings (
                              id,
                              friendly_name,
                              friendly_description,
                              default_value
                          )
                          VALUES (
                              'sharing_location_history',
                              'Share location history',
                              'When sharing a track, also share where you have played it.',
                              'false'
                          );

INSERT INTO user_settings (
                              id,
                              friendly_name,
                              friendly_description,
                              default_value
                          )
                          VALUES (
                              'sharing_mood_history',
                              'Share mood history',
                              'When sharing a track, also share the mood you were in when you played it, and if you played all the track.',
                              'false'
                          );


-- Table: mood_pairings
DROP TABLE IF EXISTS mood_pairings;

CREATE TABLE mood_pairings (
    mood_hot  TEXT PRIMARY KEY
                   REFERENCES supported_moods (id) ON DELETE CASCADE
                                                   ON UPDATE CASCADE
                                                   MATCH SIMPLE
                   UNIQUE
                   NOT NULL,
    mood_cool TEXT REFERENCES supported_moods (id) ON DELETE CASCADE
                                                   ON UPDATE CASCADE
                                                   MATCH SIMPLE
                   UNIQUE
                   NOT NULL
);

INSERT INTO mood_pairings (
                              mood_hot,
                              mood_cool
                          )
                          VALUES (
                              'focussed',
                              'bored'
                          );

INSERT INTO mood_pairings (
                              mood_hot,
                              mood_cool
                          )
                          VALUES (
                              'physical',
                              'tired'
                          );

INSERT INTO mood_pairings (
                              mood_hot,
                              mood_cool
                          )
                          VALUES (
                              'happy',
                              'sad'
                          );

INSERT INTO mood_pairings (
                              mood_hot,
                              mood_cool
                          )
                          VALUES (
                              'crazy',
                              'restful'
                          );

INSERT INTO mood_pairings (
                              mood_hot,
                              mood_cool
                          )
                          VALUES (
                              'angry',
                              'peaceful'
                          );


-- Table: tracks_to_references
DROP TABLE IF EXISTS tracks_to_references;

CREATE TABLE tracks_to_references (
    id           TEXT PRIMARY KEY
                      UNIQUE
                      NOT NULL,
    track_id     TEXT REFERENCES tracks (id) ON DELETE CASCADE
                                             ON UPDATE CASCADE
                                             MATCH SIMPLE
                      NOT NULL,
    reference_id TEXT REFERENCES music_providers (id) ON DELETE CASCADE
                                                      ON UPDATE CASCADE
                                                      MATCH SIMPLE
                      NOT NULL
);


-- Table: connections
DROP TABLE IF EXISTS connections;

CREATE TABLE connections (
    id                              TEXT    PRIMARY KEY
                                            UNIQUE
                                            NOT NULL,
    connection_state                INTEGER REFERENCES supported_connection_states (id) ON DELETE CASCADE
                                                                                        ON UPDATE SET DEFAULT
                                                                                        MATCH SIMPLE,
    target_profile                  TEXT    REFERENCES profiles (id) ON DELETE CASCADE
                                                                     ON UPDATE CASCADE
                                                                     MATCH SIMPLE,
    state_change_timestamp_epoch_ms INTEGER NOT NULL,
    provider_device_id              TEXT    NOT NULL,
    provider_connection_id          TEXT
);


-- Table: music_providers
DROP TABLE IF EXISTS music_providers;

CREATE TABLE music_providers (
    id             TEXT PRIMARY KEY
                        UNIQUE
                        NOT NULL,
    friendly_name  TEXT NOT NULL,
    homepage_url   TEXT NOT NULL,
    token          TEXT,
    csv_genre_tags TEXT
);

INSERT INTO music_providers (
                                id,
                                friendly_name,
                                homepage_url,
                                token,
                                csv_genre_tags
                            )
                            VALUES (
                                '89a2b713-0265-42f7-9aac-01739e530bdc',
                                'Spotify',
                                'https://www.spotify.com/uk/',
                                NULL,
                                NULL
                            );


-- Table: settings
DROP TABLE IF EXISTS settings;

CREATE TABLE settings (
    id         TEXT UNIQUE
                    NOT NULL
                    PRIMARY KEY,
    value      TEXT,
    value_type TEXT
);

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'push_device_id',
                         NULL,
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'private_key_id',
                         NULL,
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'profile_id',
                         NULL,
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'public_key_id',
                         NULL,
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'music_provider_id',
                         NULL,
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'sharing_play_history',
                         NULL,
                         'boolean'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'collection_play_history',
                         NULL,
                         'boolean'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'sharing_location_history',
                         NULL,
                         'boolean'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'collection_location_history',
                         NULL,
                         'boolean'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'sharing_mood_history',
                         'true',
                         'boolean'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'collection_mood_history',
                         NULL,
                         'boolean'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'auth_spotify_client_id',
                         'e09602dc211e406a99b2a1d74215b03e',
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'auth_spotify_redirect_url',
                         'gaddumspotify://callback',
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'auth_spotify_token_exchange_url',
                         'https://gaddumauth.herokuapp.com:443/spotify/exchange',
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'auth_spotify_token_refresh_url',
                         'https://gaddumauth.herokuapp.com:443/spotify/refresh',
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'auth_spotify_access_token',
                         NULL,
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'auth_spotify_expires_at',
                         NULL,
                         'integer'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'auth_spotify_encrypted_refresh_token',
                         NULL,
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'first_time_help',
                         NULL,
                         'boolean'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'avatar_graphic',
                         '',
                         'string'
                     );

INSERT INTO settings (
                         id,
                         value,
                         value_type
                     )
                     VALUES (
                         'avatar_name',
                         NULL,
                         'string'
                     );


-- Table: tracks_to_artwork
DROP TABLE IF EXISTS tracks_to_artwork;

CREATE TABLE tracks_to_artwork (
    id          TEXT PRIMARY KEY
                     UNIQUE
                     NOT NULL,
    track_id    TEXT REFERENCES tracks (id) ON DELETE CASCADE
                                            ON UPDATE CASCADE
                                            MATCH SIMPLE
                     NOT NULL,
    resource_id TEXT REFERENCES tracks (id) ON DELETE CASCADE
                                            ON UPDATE CASCADE
                                            MATCH SIMPLE
                     NOT NULL
);


-- Table: gifted_playlists
DROP TABLE IF EXISTS gifted_playlists;

CREATE TABLE gifted_playlists (
    id           TEXT    REFERENCES playlists (id) ON DELETE CASCADE
                                                   ON UPDATE CASCADE
                                                   MATCH SIMPLE
                         NOT NULL
                         UNIQUE,
    mood_enabled BOOLEAN
);


-- Table: track_references
DROP TABLE IF EXISTS track_references;

CREATE TABLE track_references (
    id          TEXT PRIMARY KEY
                     NOT NULL
                     UNIQUE,
    web_uri     TEXT,
    player_uri  TEXT,
    provider_id TEXT REFERENCES music_providers (id) ON DELETE CASCADE
                                                     ON UPDATE CASCADE
                                                     MATCH SIMPLE
);


-- Table: tracks_to_music_providers
DROP TABLE IF EXISTS tracks_to_music_providers;

CREATE TABLE tracks_to_music_providers (
    id                TEXT PRIMARY KEY
                           UNIQUE
                           NOT NULL,
    track_id          TEXT REFERENCES tracks (id) ON DELETE CASCADE
                                                  ON UPDATE CASCADE
                                                  MATCH SIMPLE
                           NOT NULL,
    music_provider_id TEXT REFERENCES music_providers (id) ON DELETE CASCADE
                                                           ON UPDATE CASCADE
                                                           MATCH SIMPLE
                           NOT NULL
);


-- Table: supported_connection_states
DROP TABLE IF EXISTS supported_connection_states;

CREATE TABLE supported_connection_states (
    id   INTEGER PRIMARY KEY
                 UNIQUE
                 NOT NULL,
    name TEXT    UNIQUE
                 NOT NULL
);


-- Table: profiles_to_encryption_keys
DROP TABLE IF EXISTS profiles_to_encryption_keys;

CREATE TABLE profiles_to_encryption_keys (
    id             TEXT PRIMARY KEY
                        UNIQUE
                        NOT NULL,
    profile        TEXT REFERENCES profiles (id) ON DELETE CASCADE
                                                 ON UPDATE CASCADE
                                                 MATCH SIMPLE
                        NOT NULL,
    encryption_key TEXT REFERENCES encryption_keys (id) ON DELETE CASCADE
                                                        ON UPDATE CASCADE
                                                        MATCH SIMPLE
                        NOT NULL
);


-- Table: playlists_to_profiles
DROP TABLE IF EXISTS playlists_to_profiles;

CREATE TABLE playlists_to_profiles (
    playlist TEXT REFERENCES playlists (id) ON DELETE CASCADE
                                            ON UPDATE CASCADE
                                            MATCH SIMPLE
                  NOT NULL,
    profile  TEXT REFERENCES profiles (id) ON DELETE CASCADE
                                           ON UPDATE CASCADE
                                           MATCH SIMPLE
                  NOT NULL
);


-- Table: base64_resources
DROP TABLE IF EXISTS base64_resources;

CREATE TABLE base64_resources (
    id        TEXT    PRIMARY KEY
                      NOT NULL
                      UNIQUE,
    content   TEXT,
    is_url    BOOLEAN,
    mime_type TEXT    NOT NULL
);


-- Table: profiles
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
    id                TEXT PRIMARY KEY
                           UNIQUE
                           NOT NULL,
    name              TEXT,
    avatar_graphic_id TEXT REFERENCES base64_resources (id) ON DELETE SET NULL
                                                            ON UPDATE CASCADE
);


-- Table: playlists
DROP TABLE IF EXISTS playlists;

CREATE TABLE playlists (
    id   TEXT PRIMARY KEY
              UNIQUE
              NOT NULL,
    name TEXT
);


-- Table: criteria_to_moods
DROP TABLE IF EXISTS criteria_to_moods;

CREATE TABLE criteria_to_moods (
    id          TEXT   PRIMARY KEY
                       UNIQUE
                       NOT NULL,
    criteria    TEXT   REFERENCES supported_face_criteria (id) ON DELETE CASCADE
                                                               ON UPDATE CASCADE
                                                               MATCH SIMPLE
                       NOT NULL,
    mood        TEXT   REFERENCES supported_moods (id) ON DELETE CASCADE
                                                       ON UPDATE CASCADE
                                                       MATCH SIMPLE
                       NOT NULL,
    trigger_max DOUBLE,
    trigger_min DOUBLE
);

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '3f20eba0-bb93-47aa-bd9f-373081c86db1',
                                  'mouthOpen',
                                  'physical',
                                  0.6,
                                  0.1
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'a4446eff-d4ad-4ca7-be14-4c89f3e4d4e1',
                                  'mouthRound',
                                  'physical',
                                  NULL,
                                  0.5
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'c2819bb0-dd73-41a4-a883-c2e58d59e81d',
                                  'both_eyebrows_up',
                                  'physical',
                                  NULL,
                                  0.3
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'ec8263d0-75c7-4b4a-abd2-6d311b7e274b',
                                  'mouthOpen',
                                  'tired',
                                  NULL,
                                  0.7
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '7f54a6bb-db0e-4211-8b1f-7f18cad1cf97',
                                  'both_eyes_closed',
                                  'tired',
                                  NULL,
                                  0.8
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '1f62822f-48a1-4e12-be15-139822e89db3',
                                  'mouthNasty',
                                  'angry',
                                  NULL,
                                  0.8
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '12d42867-0a4f-408e-a6f2-378611decc81',
                                  'both_eyebrows_down',
                                  'angry',
                                  NULL,
                                  0.6
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'ef86d31a-d439-4548-a605-949f028014bb',
                                  'smile',
                                  'peaceful',
                                  0.2,
                                  0.1
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '1b6c3cb9-2ba7-4081-a51c-d52006a5da42',
                                  'both_eyebrows_up',
                                  'peaceful',
                                  NULL,
                                  0.4
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '0de17458-6d46-4890-b10a-40faeb9a7dc6',
                                  'both_eyes_closed',
                                  'peaceful',
                                  0.5,
                                  0.2
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'a018c3ca-3a0e-45f6-a0e0-099f19282683',
                                  'both_eyes_closed',
                                  'focussed',
                                  0.1,
                                  NULL
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'f45ed165-c60f-47cf-b811-0e8298187b87',
                                  'smile',
                                  'focussed',
                                  0.1,
                                  NULL
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'dfe1654b-90a6-496d-a811-f0b1b1d58f43',
                                  'both_eyebrows_down',
                                  'focussed',
                                  0.9,
                                  0.6
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'b5149dcd-98a3-4cdb-81fa-99a867c4b932',
                                  'both_eyebrows_up',
                                  'happy',
                                  0.6,
                                  0.2
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '475a6523-b789-4629-aee1-26f593f5a565',
                                  'smile',
                                  'happy',
                                  NULL,
                                  0.3
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '39aa229b-f8f8-42e0-a079-eff6cbac32c6',
                                  'both_eyes_closed',
                                  'bored',
                                  NULL,
                                  0
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '10646c92-4de9-4d7b-8278-cf1f5921f1fb',
                                  'cocked_eyebrow',
                                  'bored',
                                  NULL,
                                  0.2
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '72c2737d-f0fb-48a5-a80d-0ec70f4f5b12',
                                  'lopsided_smile',
                                  'bored',
                                  NULL,
                                  0.85
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'aed65ea4-1bff-4555-9ae4-76c0f460fad6',
                                  'smile',
                                  'sad',
                                  0.01,
                                  NULL
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'e1f770fb-37f7-453d-85dd-23a7e1e328b9',
                                  'both_eyebrows_down',
                                  'sad',
                                  0.4,
                                  0.1
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '5c0a22ea-bd77-4a53-be07-bafe193f2384',
                                  'lopsided_smile',
                                  'crazy',
                                  NULL,
                                  0.8
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '4ccc5a73-86c7-4da7-b758-3e66fcee7778',
                                  'wink',
                                  'crazy',
                                  NULL,
                                  0.8
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  '86198836-8b93-4d9d-90d6-9b172f1033eb',
                                  'both_eyes_closed',
                                  'restful',
                                  NULL,
                                  0.7
                              );

INSERT INTO criteria_to_moods (
                                  id,
                                  criteria,
                                  mood,
                                  trigger_max,
                                  trigger_min
                              )
                              VALUES (
                                  'c52970ac-6d81-47d8-844f-03987ae8983e',
                                  'smile',
                                  'restful',
                                  0.1,
                                  NULL
                              );


-- Table: queue
DROP TABLE IF EXISTS queue;

CREATE TABLE queue (
    id        TEXT    PRIMARY KEY
                      NOT NULL
                      UNIQUE,
    timestamp INTEGER NOT NULL,
    item      STRING  NOT NULL,
    type      STRING  NOT NULL
);


-- Table: supported_moods
DROP TABLE IF EXISTS supported_moods;

CREATE TABLE supported_moods (
    id                TEXT PRIMARY KEY ASC ON CONFLICT FAIL
                           NOT NULL,
    name              TEXT NOT NULL
                           UNIQUE,
    icon_resource     TEXT REFERENCES base64_resources (id) ON DELETE SET NULL
                                                            ON UPDATE CASCADE
                                                            MATCH SIMPLE,
    music_resource    TEXT REFERENCES base64_resources (id) ON DELETE SET NULL
                                                            ON UPDATE CASCADE
                                                            MATCH SIMPLE,
    emoticon_resource TEXT
);

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'peaceful',
                                'peaceful',
                                NULL,
                                NULL,
                                '😇'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'angry',
                                'angry',
                                NULL,
                                NULL,
                                '😡'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'restful',
                                'restful',
                                NULL,
                                NULL,
                                '😌'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'crazy',
                                'crazy',
                                NULL,
                                NULL,
                                '😜'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'sad',
                                'sad',
                                NULL,
                                NULL,
                                '😟'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'happy',
                                'happy',
                                NULL,
                                NULL,
                                '😀'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'tired',
                                'tired',
                                NULL,
                                NULL,
                                '😴'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'physical',
                                'physical',
                                NULL,
                                NULL,
                                '💪'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'bored',
                                'bored',
                                NULL,
                                NULL,
                                '🙄'
                            );

INSERT INTO supported_moods (
                                id,
                                name,
                                icon_resource,
                                music_resource,
                                emoticon_resource
                            )
                            VALUES (
                                'focussed',
                                'focussed',
                                NULL,
                                NULL,
                                '🤔'
                            );


-- Table: supported_timeslots
DROP TABLE IF EXISTS supported_timeslots;

CREATE TABLE supported_timeslots (
    id   INTEGER PRIMARY KEY ASC ON CONFLICT FAIL AUTOINCREMENT
                 UNIQUE
                 NOT NULL,
    name TEXT    NOT NULL
                 UNIQUE
);


-- Table: encryption_keys
DROP TABLE IF EXISTS encryption_keys;

CREATE TABLE encryption_keys (
    id         TEXT PRIMARY KEY
                    UNIQUE
                    NOT NULL,
    base64_key TEXT NOT NULL
);


-- COMMIT TRANSACTION;
-- PRAGMA foreign_keys = on;
