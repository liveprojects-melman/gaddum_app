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
          }
        );

      return deferred.promise;


    };

    function login() {
      cordova.plugins.spotifyAuth.authorize(AUTH_CONFIG)
        .then(function spotifyAuthSuccess(accessToken, expiresAt) {
          console.log("gaddum.musicProvider.Spotify.service.js:signIn success, ", accessToken, expiresAt);
        })
    }


    var service = {
      asyncInit: asyncInit,
      login: login
    };

    return service;
  }
})();
