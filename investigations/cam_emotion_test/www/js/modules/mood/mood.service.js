(function() {
  'use strict;'

  angular
    .module('mood', [])
    .factory('moodService', moodService)
  ;

  moodService.$inject = [
    '$http'
  ];
  function moodService(
    $http
  ) {
    var service={
      EMOTIONS:{
        "0": {
          name:"HAPPY",
          emoji: "😀"
        },
        "1": {
          name: "SAD",
          emoji:"😭"
        }
      }
    };

    return service;
  }
})();
