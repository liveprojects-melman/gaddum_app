// as per https://trello.com/c/tWfwgXbh/7-musicproviderservice
(function(){
  'use strict';

  angular
    .module('gaddum.streaming', [])
    .factory('gaddum.musicProvider.service', gaddumMusicProviderService);

  gaddumMusicProviderService.$inject = [
    '$http'
  ];
  function gaddumMusicProviderService(
    $http
  ) {
    var service = {
      musicProvider: [],
      setSupportedServiceProvider: function(musicProvider){},
      login: function login(){

      },
      isLoggedIn: function isLoggedIn(){
      },
      logout: function logout(){

      },
      seekTracks: function seekTracks(x){
        // callbacks
      },
      setTracks: function setTracks(x){
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
//      service.ready = true;
//      service.playing = false;
    };
/*
    service.init();

    return service;

  }

})();
