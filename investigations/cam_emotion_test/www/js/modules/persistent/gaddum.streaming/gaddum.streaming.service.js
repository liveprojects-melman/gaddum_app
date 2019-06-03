(function(){
  'use strict;'

  angular
    .module('gaddum.streaming', [])
    .factory('gaddum.streaming.service', gaddumStreamingService);

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
        title: "",
        artist: ""
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
