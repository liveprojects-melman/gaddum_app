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
  console.log("HERE 1.2");
  function gaddumMusicProviderService(
    $http,
    $injector
  ) {

    console.log("HERE 1.3");

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
        service.musicProvider.asyncLogin();
      },
      isLoggedIn: function isLoggedIn() {
        console.log("check if the user is logged in");
      },
      logout: function logout() {

      },
      seekTracks: function seekTracks(x) {
        // callbacks
      },
      setTracks: function setTracks(x) {
        // callbacks
      },
      importAllPlaylists: function importAllPlaylists(x) {

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
