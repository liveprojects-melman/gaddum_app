(function() {
  'use strict;'

  angular
    .module('profile', [])
    .factory('profileService', profileService)
  ;

  profileService.$inject = [
    '$http'
  ];
  function profileService(
    $http
  ) {
    var service={};

    return service;
  }
})();
