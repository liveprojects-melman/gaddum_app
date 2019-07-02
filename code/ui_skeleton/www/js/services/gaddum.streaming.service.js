(function(){
  'use strict;'

  angular
    .module('gaddum.streaming', [])
    .factory('gaddumStreamingService', gaddumStreamingService);

  gaddumStreamingService.$inject = [
    '$http'
  ];
  function gaddumStreamingService(
    $http
  ) {
    var service = {
      state: {
        ready: false,
        playing: false
      },
      song: {
        "songTitle": "TESTING",
        "artistName": "Does It Work?"
      }
    };

    service.init = function init() {
      service.ready = true;
      service.playing = false;
    };

    service.init();

    return service;

  }

})();
