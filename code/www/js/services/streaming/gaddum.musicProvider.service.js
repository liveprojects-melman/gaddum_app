// as per https://trello.com/c/tWfwgXbh/7-musicproviderservice
(function () {
  'use strict';

  angular
    .module('gaddum.streaming')
    .factory('gaddumMusicProviderService', gaddumMusicProviderService);

  gaddumMusicProviderService.$inject = [
    '$http',
    '$injector'
  ];

  function gaddumMusicProviderService(
    $http,
    $injector
  ) {

    var service = {
      musicProvider: undefined,
      musicProviders: ["gaddumMusicProviderSpotifyService"],
      getSupportedServiceProviders: function getSupportedServiceProviders() {
        return (service.musicProviders);
      },
      asyncSetSupportedServiceProvider: function setSupportedServiceProvider(musicProviderName) {

        if (service.musicProviders && service.musicProviders.length > 0) {

          // dynamic injection: see http://next.plnkr.co/edit/iVblEU?p=preview&utm_source=legacy&utm_medium=worker&utm_campaign=next&preview, https://stackoverflow.com/questions/13724832/angularjs-runtime-dependency-injection
          for (var i in service.musicProviders) {
            if (service.musicProviders.hasOwnProperty(i)) {
              service.musicProvider = $injector.get(musicProviderName);
              return service.musicProvider.asyncInit();
            }
          }
        } else {
          throw (new Error("no music providers!"));
        }
      },
      asyncLogin: function asyncLogin() {
        
        return service.musicProvider.asyncLogin();
      },
      asyncIsLoggedIn: function asyncIsLoggedIn() {
        
        return service.musicProvider.asyncIsLoggedIn();
      },
      asyncLogout: function asyncLogout() {
        return service.musicProvider.asyncLogout();
      },
      seekTracks: function seekTracks(x) {
        // callbacks
      },
      setTracks: function setTracks(x) {
        // callbacks
      },
      importAllPlaylists: function importAllPlaylists(limit=10,offset=0) {
          var token = JSON.parse(localStorage.SpotifyOAuthData)["accessToken"];
          var config = {headers: {'Authorization': `Bearer ${token}`}};
          return $http.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,config );
          
      },
      getplaylistTracks: function getplaylistTracks(result){
        
        var token = JSON.parse(localStorage.SpotifyOAuthData)["accessToken"];
        var config = {headers: {'Authorization': `Bearer ${token}`}};
        return $http.get(`https://api.spotify.com/v1/playlists/${result}/tracks`,config );
      },
      getTrackInfo: function getTrackInfo(x) {

      },
      getSupportedGenres: function getSupportedGenres() {
        // promise
      },
      setGenres: function setGenres(x) {

      },
      getGenres: function getGenres(x) {

      } /*,

      state: {
        ready: false,
        playing: false
      },
      song: {
        title: "THIS IS A TITLE",
        artist: "THIS IS AN ARTIST"
      }*/
    };

    service.init = function init() {
      service.ready = true;
      service.playing = false;
    };

    service.init();

    return service;

  }

})();
