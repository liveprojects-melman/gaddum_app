// as per https://trello.com/c/tWfwgXbh/7-musicproviderservice
(function () {
  'use strict';

  angular
    .module('gaddum.streaming')
    .factory('gaddumMusicProviderService', gaddumMusicProviderService);

  gaddumMusicProviderService.$inject = [
    '$http',
    '$injector',
    '$timeout',
    '$q'
  ];

  function gaddumMusicProviderService(
    $http,
    $injector,
    $timeout,
    $q
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
      playTrack: function playTrack(TID){//doesnt work thought it would ;(
        return service.musicProvider.playTrack(TID);
      },
      pause: function pause(){
        return service.musicProvider.pause();
      },

      importAllPlaylists: function importAllPlaylists(offset) {
        return service.musicProvider.importAllPlaylists(offset);
      },

      getplaylistTracks: function getplaylistTracks(PID){

        return service.musicProvider.getPlaylistTracks(PID);
      },
      searchSpotify: function searchSpotify(searchTerm,type){
        return service.musicProvider.searchSpotify(searchTerm,type);
      },
      getTrackInfo: function getTrackInfo(x) {

      },
      getSupportedGenres: function getSupportedGenres() {
        // promise
      },
      setGenres: function setGenres(x) {

      },
      getGenres: function getGenres(x) {

      },
      asyncGetAccessToken: function asynceGetAccessToken(){
        return $timeout(function(){
          return JSON.parse(localStorage.SpotifyOAuthData)["accessToken"];
        },0);
      },
      asyncImportPlaylists: function asyncImportPlaylists(importArray){
        //return service.musicProvider.asyncImportPlaylists(importArray);
      }

      /*,

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
