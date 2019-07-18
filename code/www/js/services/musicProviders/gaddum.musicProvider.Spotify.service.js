// we are using https://github.com/Festify/cordova-spotify-oauth
(function(){
  'use strict';

  angular
    .module('gaddum.streaming', [])
    .factory('gaddum.musicProvider.Spotify.service', gaddumMusicProviderSpotifyService);

  gaddumMusicProviderSpotifyService.$inject = [
    
  ];
  function gaddumMusicProviderSpotifyService(

  ) {

    var AUTH_CONFIG = {
      clientId: "",
      redirectUrl: "",
      scopes: ["streaming"],
      tokenExchangeUrl: "",
      tokenRefreshUrl: ""
    }

    var service = {
      
    };

    service.init = function init(){
      
    };

    service.init();


    service.signIn = function signIn() {
      cordova.plugins.spotifyAuth.authorize(AUTH_CONFIG)
        .then(function spotifyAuthSuccess({}))
    }

    return service;
  }
})
