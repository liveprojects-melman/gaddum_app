(function () {
  'use strict;'
    
  angular
    .module('gaddum.streaming')
    .factory('gaddumMusicProviderSpotifyService', gaddumMusicProviderSpotifyService);

    gaddumMusicProviderSpotifyService.$inject = [
      'allSettingsService',
      '$q',
      '$timeout',
      '$http'
  ];
  console.log("HERE 2.2");
  function gaddumMusicProviderSpotifyService(
    allSettingsService,
    $q,
    $timeout,
    $http
  ) {

    var AUTH_CONFIG = {
      clientId: "gaddumspotify",
      encryptionSecret: "",
      redirectUrl: "gaddumspotify://redirect",
      scopes: ["streaming"],
      //scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"], // enable as needed
      tokenExchangeUrl: "https://gaddumauth.heroku.com:443/spotify/exchange",
      tokenRefreshUrl: "https://gaddumauth.heroku.com:443/spotify/refresh"
    }


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
          function(error){
            deferred.reject(error);
          }

        );

      return deferred.promise;


    };


    function asyncIsLoggedIn(){

      var deferred = $q.defer();
      var promises = [];
      promises.push(allSettingsService.asyncGet('auth_spotify_access_token'));
      promises.push(allSettingsService.asyncGet('auth_spotify_expires_at'));
      
      $q.all(promises).then(
        function(arrayResult){

          var accessToken = arrayResult[0]; // order important
          var expiresAt = arrayResult[1];
          var currentTimeJavaEpoch_s = Date.now() / 1000;

          var expired = currentTimeJavaEpoch_s >= expiresAt;
          
          if(accessToken && !expired){
            deferred.resolve();
          }else{
            deferred.reject();
          }


          
        }
      )

      return deferred.promise;


    }


    function asyncLogout(){

      var deferred = $q.defer();
      var promises = [];
      promises.push(allSettingsService.asyncSet('auth_spotify_access_token',null, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_expires_at',null, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_encrypted_refresh_token',null, 'string'));

      
      $q.all(promises).then(
        function(arrayResult){
            deferred.resolve();
        }
      )

      return deferred.promise;
    }


    function aSyncAuthSuccess(response) {
      var deferred = $q.defer();
      var promises = [];
      promises.push(allSettingsService.asyncSet('auth_spotify_access_token', response.accessToken, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_expires_at', response.expiresAt, 'string'));
      promises.push(allSettingsService.asyncSet('auth_spotify_encrypted_refresh_token', response.encryptedRefreshToken, 'string'));
      
      $q.all(promises).then(
        function(result){
          deferred.resolve();
        }
      )

      return deferred.promise;
    }



    function asyncLogin() {
      return cordova.plugins.spotifyAuth.authorize(AUTH_CONFIG)
        .then(
          aSyncAuthSuccess,
          function(error){
            console.log(error);
          }
          );
    }
    function playTrack(TID){
      return $q(function(resolve,reject){
          var deviceID = device.uuid;
          service.asyncGetAccessToken().then(function(result){
              cordova.plugins.spotify.play(`spotify:track:${TID}`, { 
              clientId: `${deviceID}`,
              token: `${result}`
            }).then(function(){
              return resolve(true);
            });
          });
        });
    }
    function pause(){
      return $q(function(resolve,reject){
          cordova.plugins.spotify.pause()
            then(function(){
              return resolve(true);
            });
        });
    }
    function importAllPlaylists(limit=20,offset=0){
      return $q(function(resolve,reject){
          var resualtArray = [];
          service.asyncGetAccessToken().then(function(result){
            var config = {headers: {'Authorization': `Bearer ${result}`}};
            $http.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,config ).then(function(result){
                //resualtArray.push(result);
                return resolve(result);
              });
            });
        });
    }
    function getPlaylistTracks(PID){
      return $q(function(resolve,reject){
          var resualtArray = [];
          service.asyncGetAccessToken().then(function(result){
            var config = {headers: {'Authorization': `Bearer ${result}`}};
            $http.get(`https://api.spotify.com/v1/playlists/${PID}/tracks`,config ).then(function(result){
              //resualtArray.push(result);
              return resolve(result);
            });
          });
        });
    }

    function searchSpotify(searchTerm,type){
      return $q(function(resolve,reject){
          var resualtArray = [];
          service.asyncGetAccessToken().then(function(result){
            var config = {headers: {'Authorization': `Bearer ${result}`}};
            if (type.track){
              $http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,config ).then(function(result){
                //resualtArray.push(result);
                return resolve(result);
              });
            }
            if (type.artist){
              //i did alittle set up for you and got confused good luck it didnt want to work at all.
              var artist= $http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,config );
              if(artist.artists.items.lenghth > 1){
                var topTracks = $http.get(`https://api.spotify.com/v1/artists/${artist.artists.items[0].id}/top-tracks?country=SE`, config);
                resualtArray.push(topTracks);
              }
            }
            if (type.album){
              resualtArray.push($http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=album`,config ));
            }
            if (type.playlist){
              resualtArray.push($http.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=playlist`,config ));
            }
            //resolve(resualtArray);
          });
        });
    }
    function asyncGetAccessToken(){
        return $timeout(function(){
          return JSON.parse(localStorage.SpotifyOAuthData)["accessToken"];
        },0);
      }

    var service = {
      asyncInit: asyncInit,
      asyncLogin: asyncLogin,
      asyncIsLoggedIn: asyncIsLoggedIn,
      asyncLogout: asyncLogout,
      playTrack:playTrack,
      pause:pause,
      importAllPlaylists:importAllPlaylists,
      getPlaylistTracks:getPlaylistTracks,
      searchSpotify:searchSpotify,
      asyncGetAccessToken:asyncGetAccessToken

    };

    return service;
  }
})();
