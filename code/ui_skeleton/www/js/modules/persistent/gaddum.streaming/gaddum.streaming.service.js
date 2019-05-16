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
    var service = {};

    service.init = function init() {
      stream.ready = true;
      stream.playing = false;
    };
    
    service.init();

    return service;

  }

})();
