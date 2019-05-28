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
    var service={};

    return service;
  }
})();
