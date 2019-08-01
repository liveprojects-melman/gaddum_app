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
    'AccessCredentials'
  ];

  function gaddumMusicProviderSpotifyService(
    allSettingsService,
    $q,
    $timeout,
    SearchModifier,
    $http,
    ErrorIdentifier,
    AccessCredentials

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
        function(error){
          deferred.reject(error)
        }
      )

      return deferred.promise;
    }



    function asyncLogin() {
      console.log("attempting login ... ");
      return cordova.plugins.spotifyAuth.authorize(AUTH_CONFIG) // spotify auth actually caches the cred for you, but we're using the database
        .then(
          function(result){
            asyncAuthSuccess(result);
          }
        );
    }


    function asyncRefresh() {
      return cordova.plugins.spotifyAuth.authorize(AUTH_CONFIG) // spotify auth actually caches the cred for you, but we're using the database
        .then(
          function(result){
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

    function asyncGetSupportedGenres(){
      var deferred = $q.defer();

      $timeout(
        function(){
          deferred.resolve(GENRES_LIST);
      });


      return deferred.promise;
    }


    function asyncSetGenres(candidates){
      var deferred = $q.defer();

      $timeout(
        function(){
          userGenres = candidates;
          deferred.resolve(userGenres);
      });


      return deferred.promise;
    }

    function asyncGetGenres(){
      var deferred = $q.defer();

      $timeout(
        function(){
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
    function importAllPlaylists(limit = 20, offset = 0) {
      return $q(function (resolve, reject) {
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

    function searchSpotify(searchTerm, type) {
      return $q(function (resolve, reject) {
        var resualtArray = [];
        asyncGetAccessCredentials().then(function (result) {
          var config = { headers: { 'Authorization': `Bearer ${result}` } };
          if (type.track) {
            $http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, config).then(function (result) {
              //resualtArray.push(result);
              return resolve(result);
            });
          }
          if (type.artist) {
            //i did alittle set up for you and got confused good luck it didnt want to work at all.
            var artist = $http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, config);
            if (artist.artists.items.lenghth > 1) {
              var topTracks = $http.get(`https://api.spotify.com/v1/artists/${artist.artists.items[0].id}/top-tracks?country=SE`, config);
              resualtArray.push(topTracks);
            }
          }
          if (type.album) {
            resualtArray.push($http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=album`, config));
          }
          if (type.playlist) {
            resualtArray.push($http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=playlist`, config));
          }
          //resolve(resualtArray);
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
      searchSpotify: searchSpotify
    };

    return service;
  }
})();
