(function () {
  'use strict;'

  angular
    .module('gaddum.streaming')
    .factory('gaddumMusicProviderSpotifyService', gaddumMusicProviderSpotifyService);

  gaddumMusicProviderSpotifyService.$inject = [
    'allSettingsService',
    '$q',
    '$timeout',
    'SearchModifier',
    '$http',
    'ErrorIdentifier',
    'AccessCredentials',
    'SearchModifier',
    'gaddumMusicProviderService',
    'TrackInfo'
  ];

  function gaddumMusicProviderSpotifyService(
    allSettingsService,
    $q,
    $timeout,
    SearchModifier,
    $http,
    ErrorIdentifier,
    AccessCredentials,
    SearchModifier,
    gaddumMusicProviderService,
    TrackInfo

  ) {


    // ------ UTILITY

    var AUTH_CONFIG = {
      clientId: "gaddumspotify",
      encryptionSecret: "",
      redirectUrl: "gaddumspotify://redirect",
      scopes: ["streaming"],
      //scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"], // enable as needed
      tokenExchangeUrl: "https://gaddumauth.heroku.com:443/spotify/exchange",
      tokenRefreshUrl: "https://gaddumauth.heroku.com:443/spotify/refresh"
    }


    var CACHED_ACCESS_CREDENTIALS = null;


    var GENRES_LIST = [
      "Afrobeat",
      "Blues",
      "Lo-fi",
      "Mambo",
      "Reggae",
      "Rocksteady",
      "Dancehall",
      "Soca",
      "Ska",
      "Bluegrass",
      "Country",
      "K-pop",
      "J-pop",
      "Hiphop",
      "Techno",
      "Drill",
      "Grime",
      "House",
      "Electronic",
      "Hardbass",
      "Funk",
      "Disco",
      "Soul",
      "Motown",
      "Jazz"]


    var userGenres = [];

    function createSpotifySearchModifiers() {

      var result = [];


      result.push(
        SearchModifier.build(name, "Track Name")
      );
      result.push(
        SearchModifier.build(artist, "Artist")
      );
      result.push(
        SearchModifier.build(album, "Album")
      );
      result.push(
        SearchModifier.build(tag, "Tags")
      );

      return result;

    }



    // PRIVATE

    function asyncAuthSuccess(response) {
      var deferred = $q.defer();
      var promises = [];

      promises.push(allSettingsService.asyncSet('auth_spotify_access_token', response.accessToken, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_expires_at', response.expiresAt, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_encrypted_refresh_token', response.encryptedRefreshToken, 'string'));

      CACHED_ACCESS_CREDENTIALS = AccessCredentials.build(response.accessToken, response.expiresAt, response.encryptedRefreshToken);

      $q.all(promises).then(
        function (result) {
          deferred.resolve(CACHED_ACCESS_CREDENTIALS);
        },
        function (error) {
          deferred.reject(error)
        }
      )

      return deferred.promise;
    }



    function asyncLogin() {
      console.log("attempting login ... ");
      return cordova.plugins.spotifyAuth.authorize(AUTH_CONFIG) // spotify auth actually caches the cred for you, but we're using the database
        .then(
          function (result) {
            asyncAuthSuccess(result);
          }
        );
    }


    function asyncRefresh() {
      return cordova.plugins.spotifyAuth.authorize(AUTH_CONFIG) // spotify auth actually caches the cred for you, but we're using the database
        .then(
          function (result) {
            asyncAuthSuccess(result);
          }
        );
    }




    function asyncGetVerifiedAccessCredentials() {
      var deferred = $q.defer();

      asyncGetAccessCredentials().then(
        function (accessCredentials) {
          if (accessCredentials) {
            if (accessCredentials.hasExpired()) {
              asyncRefresh().then(
                function (refreshedCredentials) {
                  deferred.resolve(refreshedCredentials);
                },
                function (err) {
                  deferred.reject(err);
                }
              );
            } else {
              deferred.resolve(accessCredentials);
            }
          } else {
            deferred.resolve(null);
          }
        },
        function (err) {
          deferred.resolve(err);
        }
      );

      return deferred.promise;
    }

    function asyncGetAccessCredentials() {
      var deferred = $q.defer();

      $timeout(
        function () {
          if (CACHED_ACCESS_CREDENTIALS) {
            deferred.resolve(CACHED_ACCESS_CREDENTIALS);
          } else {
            asyncLookupAccessCredentials().then(
              function success(creds) {
                CACHED_ACCESS_CREDENTIALS = creds;
                deferred.resolve(creds);
              },
              function error(err) {
                CACHED_ACCESS_CREDENTIALS = null;
                deferred.reject(err);
              }
            )
          }
        }
      )

      return deferred.promise;
    }

    function asyncLookupAccessCredentials() {
      var deferred = $q.defer();
      var promises = [];
      promises.push(allSettingsService.asyncGet('auth_spotify_access_token'));
      promises.push(allSettingsService.asyncGet('auth_spotify_expires_at'));
      promises.push(allSettingsService.asyncGet('auth_spotify_encrypted_refresh_token'));

      $q.all(promises).then(
        function (results) {

          if (results) {

            creds = AccessCredentials.build(
              results[0],
              results[1],
              results[2]
            ) // may be null - logged out

            deferred.resolve(creds);
          } else {
            deferred.reject(
              ErrorIdentifier.build(ErrorIdentifier.DATABASE, "Couldn't find authentication in database.")
            )
          }


          deferred.resolve();
        }
      )

      return deferred.promise;
    }






    // ------ PUBLIC

    function asyncInit() {

      var deferred = $q.defer();
      var promises = [];


      promises.push(allSettingsService.asyncGet('auth_spotify_client_id').then(
        function (result) {
          AUTH_CONFIG.clientId = result;
        }));
      promises.push(allSettingsService.asyncGet('auth_spotify_redirect_url').then(
        function (result) {
          AUTH_CONFIG.redirectUrl = result;
        }));
      promises.push(allSettingsService.asyncGet('auth_spotify_token_exchange_url').then(
        function (result) {
          AUTH_CONFIG.tokenExchangeUrl = result;
        }));
      promises.push(allSettingsService.asyncGet('auth_spotify_token_refresh_url').then(
        function (result) {
          AUTH_CONFIG.tokenRefreshUrl = result;
        }));

      $q.all(promises).then(
        function (results) {
          deferred.resolve(AUTH_CONFIG);
        },
        function (error) {
          deferred.reject(error);
        }

      );

      return deferred.promise;


    };


    function asyncIsLoggedIn() {
      var deferred = $q.defer();
      asyncGetVerifiedAccessCredentials().then(
        function (credentials) {
          if (credentials) {
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }
        },
        function (err) {
          deferred.reject(err);
        }
      )
      return deferred.promise;
    }


    function asyncLogout() {


      // Cordova Auth hides in local storage
      cordova.plugins.spotifyAuth.forget();


      // .. and our own in the DB
      var deferred = $q.defer();
      var promises = [];

      promises.push(allSettingsService.asyncSet('auth_spotify_access_token', null, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_expires_at', null, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_encrypted_refresh_token', null, 'string'));

      CACHED_ACCESS_CREDENTIALS = null;


      $q.all(promises).then(
        function (arrayResult) {
          deferred.resolve();
        },
        function (err) {
          deferred.reject(err);
        }

      );

      return deferred.promise;
    }

    function asyncGetSupportedGenres() {
      var deferred = $q.defer();

      $timeout(
        function () {
          deferred.resolve(GENRES_LIST);
        });


      return deferred.promise;
    }


    function asyncSetGenres(candidates) {
      var deferred = $q.defer();

      $timeout(
        function () {
          userGenres = candidates;
          deferred.resolve(userGenres);
        });


      return deferred.promise;
    }

    function asyncGetGenres() {
      var deferred = $q.defer();

      $timeout(
        function () {
          deferred.resolve(userGenres);
        });


      return deferred.promise;
    }


    function asyncGetSupportedSearchModifiers() {
      // may make this a DB function
      var deferred = $q.defer();

      $timeout(
        function () {
          deferred.resolve(
            createSpotifySearchModifiers()
          );
        }
      );

      return deferred.promise;

    }


    // --- needs a tidy
    function playTrack(TID) {
      return $q(function (resolve, reject) {
        var deviceID = device.uuid;
        asyncGetAccessCredentials().then(function (result) {
          cordova.plugins.spotify.play(`spotify:track:${TID}`, {
            clientId: `${deviceID}`,
            token: `${result}`
          }).then(function () {
            return resolve(true);
          });
        });
      });
    }
    function pause() {
      return $q(function (resolve, reject) {
        cordova.plugins.spotify.pause()
        then(function () {
          return resolve(true);
        });
      });
    }
    function importAllPlaylists(limit, offset) {
      return $q(function (resolve, reject) {
        limit = 20;
        var resualtArray = [];
        asyncGetAccessCredentials().then(function (result) {
          var config = { headers: { 'Authorization': `Bearer ${result}` } };
          $http.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, config).then(function (result) {
            //resualtArray.push(result);
            return resolve(result);
          });
        });
      });
    }
    function getPlaylistTracks(PID) {
      return $q(function (resolve, reject) {
        var resualtArray = [];
        asyncGetAccessCredentials().then(function (result) {
          var config = { headers: { 'Authorization': `Bearer ${result}` } };
          $http.get(`https://api.spotify.com/v1/playlists/${PID}/tracks`, config).then(function (result) {
            //resualtArray.push(result);
            return resolve(result);
          });
        });
      });
    }

    function asyncGetSupportedSearchModifier() {
      return $q(function (resolve, reject) {
        asyncMakeSearchModifiers().then(function (result) {
          console.log("spot", result);
          return resolve(result);
        });
      });
    }
    function asyncMakeSearchModifiers() {
      return $q(function (resolve, reject) {
        var searchModifierArray = [];
        searchModifierArray.push(SearchModifier.build("track", "Track"));
        searchModifierArray.push(SearchModifier.build("artist", "Artist"));
        searchModifierArray.push(SearchModifier.build("album", "Album"));
        searchModifierArray.push(SearchModifier.build("genre", "Genre"));
        return resolve(searchModifierArray);
      });
    }

    var seekTrackCache =[];
    var offset = 0;
    var searchT = null;
    var trackCrit = null;
    function asyncSeekTracks(searchTerm, trackSearchCrit,limit,page) {
      return $q(function (resolve, reject) {
        if(searchT != searchTerm){
          searchT = searchTerm;
          offset=0;
          seekTrackCache = [];
        }
        if(trackCrit != trackSearchCrit){
          trackCrit = trackSearchCrit;
          offset=0;
          seekTrackCache = [];
        }
        var seekResult=[];
        if(seekTrackCache.length > (page*limit)){
          var i;
          for(i=0;(i<(seekTrackCache.length -(page*limit)))&&(i<10);i++){
            seekResult.push(seekTrackCache[((page*limit)+i)]);
          }
          return resolve(seekResult);
        }
        else{
          asyncGetSeekTracks(searchTerm, trackSearchCrit,limit,offset).then(function(result){
            result.forEach(function(resultTrack){
              seekTrackCache.push(resultTrack);
              
            });
            if(result.length == 0){
              return reject();
            }
            offset = offset+limit;
            asyncSeekTracks(searchTerm, trackSearchCrit,limit,page).then(function(promise){
              return resolve(promise);
            });
          });
        }
      });
    }
    
    function asyncGetSeekTracks(searchTerm, trackSearchCrit,limit,offset) {
      return $q(function (resolve, reject) {
        asyncGetAccessCredentials().then(function (resultToken) {
          gaddumMusicProviderService.asyncGetSupportedGenres().then(function (resultGen) {
            var genres = null;
            genreCheck = false;
            searchResult = [];
            var searchString = null;
            genres = resultGen;
            trackSearchCrit.forEach(function (genCheck) {
              if (genCheck.id === "genre") {
                genreCheck = true;
              }
            })
            var baseSearchString = `https://api.spotify.com/v1/search?q=`;
            var config = { headers: { 'Authorization': `Bearer ${resultToken.accessToken}` } };
            trackSearchCrit.forEach(function (element) {
              if (element.id === "track") {
                if (genreCheck) {
                  genres.forEach(function (genre) {
                    searchString = baseSearchString + 'track:"' + searchTerm + '" genre:"' + genre + `"&type=track&limit=${limit}&offset=${offset}`;
                    $http.get(encodeURI(searchString), config).then(function (result) {
                      searchResult.push(result);
                    });
                  });
                }
                searchString = baseSearchString + 'track:"' + searchTerm + `"&type=track&limit=${limit}&offset=${offset}`;
                $http.get(encodeURI(searchString), config).then(function (result) {
                  searchResult.push(result);
                });

              }
              if (element.id === "artist") {
                if (genreCheck) {
                  genres.forEach(function (genre) {
                    searchString = baseSearchString + 'artist:"' + searchTerm + '" genre:"' + genre + `"&type=track&limit=${limit}&offset=${offset}`;
                    $http.get(encodeURI(searchString), config).then(function (result) {
                      searchResult.push(result);
                    });
                  });
                }
                searchString = baseSearchString + 'artist:"' + searchTerm + `"&type=track&limit=${limit}&offset=${offset}`;
                $http.get(encodeURI(searchString), config).then(function (result) {
                  searchResult.push(result);
                });

              }
              if (element.id === "album") {
                if (genreCheck) {
                  genres.forEach(function (genre) {
                    searchString = baseSearchString + 'album:"' + searchTerm + '" genre:"' + genre + `"&type=track&limit=${limit}&offset=${offset}`;
                    $http.get(encodeURI(searchString), config).then(function (result) {
                      searchResult.push(result);
                    });
                  });
                }
                searchString = baseSearchString + 'album:"' + searchTerm + `"&type=track&limit=${limit}&offset=${offset}`;
                $http.get(encodeURI(searchString), config).then(function (result) {
                  searchResult.push(result);
                });

              }
            });
            var trackList = [];
            var isntIn = false;
            $timeout(function () {
              var temp = searchResult;
              searchResult.forEach(function (element) {
                element.data.tracks.items.forEach(function (track) {
                  isntIn = false;
                  trackList.forEach(function (trackL) {
                    if (trackL.id === track.id) {
                      isntIn = true;
                    }
                    else{
                      seekTrackCache.forEach(function(cache) {
                        if(track.id === cache.id){
                          isntIn = true;
                        }
                      });
                    }
                  });
                  if (!isntIn) {
                    trackList.push(TrackInfo.build(track.name,track.album.name,track.artists[0].name,track.duration_ms,track.album.images[0].url,track.id));
                  }
                });
              });
              console.log("final search ", trackList);
              return resolve(trackList);
            },1000);

          });
        });
      });
    }





    var service = {
      asyncInit: asyncInit,
      asyncLogin: asyncLogin,
      asyncIsLoggedIn: asyncIsLoggedIn,
      asyncLogout: asyncLogout,
      asyncGetSupportedSearchModifiers: asyncGetSupportedSearchModifiers,
      asyncGetSupportedGenres: asyncGetSupportedGenres,
      asyncSetGenres: asyncSetGenres,
      asyncGetGenres: asyncGetGenres,
      playTrack: playTrack,
      pause: pause,
      importAllPlaylists: importAllPlaylists,
      getPlaylistTracks: getPlaylistTracks,
      asyncSeekTracks: asyncSeekTracks,
      asyncGetSupportedSearchModifier: asyncGetSupportedSearchModifier
    };

    return service;
  }
})();
