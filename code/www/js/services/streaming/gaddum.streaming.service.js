(function(){
  'use strict';

  angular
    .module('gaddum.streaming')
    .factory('gaddumStreamingService', gaddumStreamingService);

  gaddumStreamingService.$inject = [
    '$http',
    '$interval' // testing only
  ];
  function gaddumStreamingService(
    $http,
    $interval
  ) {
    var service = {
      state: {
        ready: false,
        playing: false
      },
      song: {
        title: "THIS IS A TITLE",
        artist: "THIS IS AN ARTIST"
      }
    };

    service.init = function init() {
      service.state.ready = true;
      service.state.playing = true;
    };

    service.init();

    // set up a thing to toggle interface from time to time!
    service.test = $interval(function(){
      service.state.playing = !service.state.playing;
      service.state.ready = !service.state.ready;
      console.log("PLAYTOGGLE");
    },5000,50, false );

    return service;

  }

})();
