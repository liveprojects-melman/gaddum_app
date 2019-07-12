(function() {
  'use strict;'

  angular
    .module('gaddum.mood')
    .factory('moodService', moodService)
  ;

  moodService.$inject = [
    '$http'
  ];
  function moodService(
    $http
  ) {
    var service={};

    return service;
  }
})();
