(function () {
  'use strict;'

  angular
    .module('gaddum.streaming')
    .factory('gaddumMusicProviderSpotifyService', gaddumMusicProviderSpotifyService);

  gaddumMusicProviderSpotifyService.$inject = [
    'allSettingsService',
    'providerSettingsService',
    '$q',
    '$timeout',
    'SearchModifier',
    '$http',
    'ErrorIdentifier',
    'AccessCredentials',
    'SearchModifier',
    'gaddumMusicProviderService',
    'TrackInfo',
    'GenericImportTrack',
    'dataApiService',
    'ImportPlaylist'
  ];

  function gaddumMusicProviderSpotifyService(
    allSettingsService,
    providerSettingsService,
    $q,
    $timeout,
    SearchModifier,
    $http,
    ErrorIdentifier,
    AccessCredentials,
    SearchModifier,
    gaddumMusicProviderService,
    TrackInfo,
    GenericImportTrack,
    dataApiService,
    ImportPlaylist

  ) {


    // ------ UTILITY


    var PROVIDER_ID = null;
    var CACHED_ACCESS_CREDENTIALS = null;



    var AUTH_CONFIG = null;




    function getProviderId() {
      return musicProviderId;
    }
    function setProviderId(uuid) {
      musicProviderId = uuid;
    }

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

      // looks awful, but we know we are putting something in the database which is supported by TimeStamp.
      var accessToken = response.accessToken;
      var refreshToken = response.encryptedRefreshToken;
      var expires_at = response.expiresAt;



      promises.push(providerSettingsService.asyncSet(PROVIDER_ID, 'access_token', accessToken));
      promises.push(providerSettingsService.asyncSet(PROVIDER_ID, 'expires_at', expires_at));
      promises.push(providerSettingsService.asyncSet(PROVIDER_ID, 'refresh_token', refreshToken));

      CACHED_ACCESS_CREDENTIALS = AccessCredentials.build(accessToken, expiresAt, refreshToken);

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
          },
          function (error) {
            console.log(error);
          }
        )
        ;
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
      promises.push(providerSettingsService.asyncGet(PROVIDER_ID, 'access_token'));
      promises.push(providerSettingsService.asyncGet(PROVIDER_ID, 'expires_at'));
      promises.push(providerSettingsService.asyncGet(PROVIDER_ID, 'refresh_token'));

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

    function asyncInit(musicProviderIdentifier) {
      PROVIDER_ID = musicProviderIdentifier;

      AUTH_CONFIG = {
        clientId: null,
        encryptionSecret: null,
        redirectUrl: null,
        scopes: ["streaming"],
        //scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"], // enable as needed
        tokenExchangeUrl: null,
        tokenRefreshUrl: null
      }

      var deferred = $q.defer();
      var promises = [];


      promises.push(providerSettingsService.asyncGet(PROVIDER_ID, 'client_id').then(
        function (result) {
          AUTH_CONFIG.clientId = result;
        }));
      promises.push(providerSettingsService.asyncGet(PROVIDER_ID, 'redirect_url').then(
        function (result) {
          AUTH_CONFIG.redirectUrl = result;
        }));
      promises.push(providerSettingsService.asyncGet(PROVIDER_ID, 'token_exchange_url').then(
        function (result) {
          AUTH_CONFIG.tokenExchangeUrl = result;
        }));
      promises.push(providerSettingsService.asyncGet(PROVIDER_ID, 'token_refresh_url').then(
        function (result) {
          AUTH_CONFIG.tokenRefreshUrl = result;
        }));

      $q.all(promises).then(
        function (results) {
          console.log("got AUTH_CONFIG");
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

      promises.push(providerSettingsService.asyncSet(PROVIDER_ID, 'access_token', null));
      promises.push(providerSettingsService.asyncSet(PROVIDER_ID, 'expires_at', null));
      promises.push(providerSettingsService.asyncSet(PROVIDER_ID, 'encrypted_refresh_token', null));

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

    function base64ToTagArray(base64Enc) { // throws
      var result = [];
      if (base64Enc != null) {
        var csv = atob(base64Enc);
        var array = csv.split(',');
        array.forEach(
          function (item) {
            result.push(item.trim());
          });
      }
      return result;

    }

    function tagArrayToBase64(tagArray) { //throws
      var result = "";
      var trimmed = [];
      if (tagArray != null) {
        tagArray.forEach(
          function (item) {
            trimmed.push(item.trim());
          }
        );
      }

      result = btoa(trimmed.join(','));

      return result;

    }


    function asyncGetSupportedGenres() {
      var deferred = $q.defer();


      providerSettingsService.asyncGet(PROVIDER_ID, 'base64_csv_genre_tags').then(
        function (base64Enc) {
          try {
            deferred.resolve(base64ToTagArray(base64Enc));
          } catch (e) {
            deferred.resolve([]);
          }

        });


      return deferred.promise;
    }


    function asyncSetGenres(candidates) {
      var deferred = $q.defer();

      $timeout(
        function () {
          try {
            var value = tagArrayToBase64(candidates);
            providerSettingsService.asyncSet(PROVIDER_ID, 'base64_csv_selected_genre_tags', value).then(
              function () {
                deferred.resolve();
              },
              function (error) {
                deferred.reject(
                  ErrorIdentifier.build(ErrorIdentifier.DATABASE, "asyncSetGenres: error: " + error.message)
                )
              }
            );
          } catch (e) {
            providerSettingsService.asyncSet(PROVIDER_ID, 'base64_csv_selected_genre_tags',null).then(
              function () {
                deferred.resolve();
              },
              function (error) {
                deferred.reject(
                  ErrorIdentifier.build(ErrorIdentifier.DATABASE, "asyncSetGenres: error: " + error.message)
                );
              }
            );
          }
        }
      );


      return deferred.promise;
    }

    function asyncGetGenres() {
      var deferred = $q.defer();


      providerSettingsService.asyncGet(PROVIDER_ID, 'base64_csv_selected_genre_tags').then(
        function (base64Enc) {
          try {
            deferred.resolve(base64ToTagArray(base64Enc));
          } catch (e) {
            deferred.resolve([]);
          }

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
    function asyncGetProfilePlaylist(offset, limit) {
      return $q(function (resolve, reject) {

        var resultArray = [];
        asyncGetAccessCredentials().then(function (result) {
          console.log(result);
          var config = { headers: { 'Authorization': `Bearer ${result.accessToken}` } };
          console.log(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, config);
          $http.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, config).then(function (results) {
            results.data.items.forEach(function (element) {
              resultArray.push(ImportPlaylist.build(element.name, element.id, element.images[0].url, element.owner.display_name));
            });
            return resolve(resultArray);
          });
        });
      });
    }
    function asyncImportPlaylists(playlists) {
      return $q(function (resolve, reject) {
        if (playlists) {
          var promises = [];
          playlists.forEach(function (playlist) {
            promises.push(asyncGetPlaylistTracks(playlist.provider_playlist_ref)
              .then(
                function (results) {
                  console.log("tracks", results);
                  asyncImportTracks(results).then(resolve, reject);
                },
                function (error) {
                  console.log(error);
                  return reject(error);
                }));
          });
        }
        $q.all(promises).then(
          resolve, reject);
      })
    }
    function asyncImportTracks(tracks) {
      return $q(function (resolve, reject) {
        if (tracks) {
          var promises = [];
          tracks.forEach(function (track) {
            dataApiService.asyncImportTrackInfo(track).
              then(
                function (result) {
                  promises.push(result);
                },
                function (error) {
                  return reject(error);
                }
              );

          });
          return resolve(promises);
        }
        else {
          return reject();
        }
      });

    }
    function asyncGetPlaylistTracks(PID) {
      return $q(function (resolve, reject) {
        var resultArray = [];
        asyncGetAccessCredentials().then(function (result) {
          var config = { headers: { 'Authorization': `Bearer ${result.accessToken}` } };
          $http.get(`https://api.spotify.com/v1/playlists/${PID}/tracks`, config).then(function (result) {
            result.data.items.forEach(function (element) {
              resultArray.push(TrackInfo.build(element.track.name, element.track.album.name, element.track.artists[0].name, element.track.duration_ms, element.track.album.images[0].url, element.track.id));
            });
            return resolve(resultArray);
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

    var seekTrackCache = [];
    var offset = 0;
    var searchT = null;
    var trackCrit = null;
    function asyncSeekTracks(searchTerm, trackSearchCrit, limit, page) {
      return $q(function (resolve, reject) {
        if (searchT != searchTerm) {
          searchT = searchTerm;
          offset = 0;
          seekTrackCache = [];
        }
        if (trackCrit != trackSearchCrit) {
          trackCrit = trackSearchCrit;
          offset = 0;
          seekTrackCache = [];
        }
        var seekResult = [];
        if (seekTrackCache.length > (page * limit)) {
          var i;
          for (i = 0; (i < (seekTrackCache.length - (page * limit))) && (i < 10); i++) {
            seekResult.push(seekTrackCache[((page * limit) + i)]);
          }
          return resolve(seekResult);
        }
        else {
          asyncGetSeekTracks(searchTerm, trackSearchCrit, limit, offset).then(function (result) {
            result.forEach(function (resultTrack) {
              seekTrackCache.push(resultTrack);

            });
            if (result.length == 0) {
              return reject();
            }
            offset = offset + limit;
            asyncSeekTracks(searchTerm, trackSearchCrit, limit, page).then(function (promise) {
              return resolve(promise);
            });
          });
        }
      });
    }

    function asyncGetSeekTracks(searchTerm, trackSearchCrit, limit, offset) {
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
                    else {
                      seekTrackCache.forEach(function (cache) {
                        if (track.id === cache.id) {
                          isntIn = true;
                        }
                      });
                    }
                  });
                  if (!isntIn) {
                    trackList.push(TrackInfo.build(track.name, track.album.name, track.artists[0].name, track.duration_ms, track.album.images[0].url, track.id));
                  }
                });
              });
              console.log("final search ", trackList);
              return resolve(trackList);
            }, 1000);

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
      asyncGetProfilePlaylist: asyncGetProfilePlaylist,
      asyncImportPlaylists: asyncImportPlaylists,
      asyncSeekTracks: asyncSeekTracks,
      asyncGetSupportedSearchModifier: asyncGetSupportedSearchModifier,
      setProviderId: setProviderId
    };

    return service;
  }
})();
