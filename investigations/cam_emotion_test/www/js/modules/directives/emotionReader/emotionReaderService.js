(function() {
  'use strict';

  angular
    .module('emotionReader', [])
    .factory('emotionReaderService', emotionReaderService);

  emotionReaderService.$inject = [];

  function emotionReaderService() {

    var service = {};
    service.EMOTIONS = {
      "0": {
        name:"HAPPY",
        emoji: "😀"
      },
      "1": {
        name: "SAD",
        emoji:"😭"
      }
    };

    return service;

  }
})();
