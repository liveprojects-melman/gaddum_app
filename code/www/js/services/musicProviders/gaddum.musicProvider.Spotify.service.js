(function () {
  'use strict;'
    
  angular
    .module('gaddum.streaming')
    .factory('gaddumMusicProviderSpotifyService', gaddumMusicProviderSpotifyService);

    gaddumMusicProviderSpotifyService.$inject = [
      'allSettingsService',
      '$q'
  ];
  console.log("HERE 2.2");
  function gaddumMusicProviderSpotifyService(
    allSettingsService,
    $q
  ) {

    var AUTH_CONFIG = {
      clientId: "",
      encryptionSecret: "",
      redirectUrl: "",
      scopes: ["streaming"],
      //scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"], // enable as needed
      tokenExchangeUrl: "",
      tokenRefreshUrl: ""
    }


    function asyncInit() {

      var deferred = $q.defer();
      var promises = [];

      promises.push(allSettingsService.asyncGet('auth_encryption_secret').then(
        function (result) {
          AUTH_CONFIG.encryptionSecret = result;
        }));
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
      console.log("gaddum.musicProvider.Spotify.service.js:asyncLogin success, ", response);

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
        .then(aSyncAuthSuccess);
    }


    var service = {
      asyncInit: asyncInit,
      asyncLogin: asyncLogin,
      asyncIsLoggedIn: asyncIsLoggedIn,
      asyncLogout: asyncLogout
    };

    return service;
  }
})();
