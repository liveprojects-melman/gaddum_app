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
      },
      pause: function pause(){
        return $q(function(resolve,reject){
          cordova.plugins.spotify.pause()
            then(function(){
              return resolve(true);
            });
        });
      },

      importAllPlaylists: function importAllPlaylists(limit=10,offset=0) {

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
      },

      getplaylistTracks: function getplaylistTracks(PID){

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
      },
      searchSpotify: function searchSpotify(searchTerm,type){
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
