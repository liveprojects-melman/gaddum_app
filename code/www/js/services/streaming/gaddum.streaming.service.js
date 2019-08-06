(function(){
  'use strict';

  angular
    .module('gaddum.streaming')
    .factory('gaddumStreamingService', gaddumStreamingService);

  gaddumStreamingService.$inject = [
    '$http',
    '$rootScope',
    '$interval' // testing only
  ];
  function gaddumStreamingService(
    $http,
    $rootScope,
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

    /*
    // set up a thing to toggle interface from time to time! (testing)
    service.test = $interval(function(){
      service.state.playing = !service.state.playing;
      console.log("PLAYTOGGLE");
    },3000,50, true ); */
    service.test2 = $interval(function(){
      service.state.ready = !service.state.ready;
      $rootScope.$broadcast('player:ready',service.state.ready);
      console.log("READYTOGGLE");
    },5000,50, true );
/*    */
    return service;

  }

})();
