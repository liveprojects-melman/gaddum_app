(function() {
  'use strict;'

  angular
    .module('gaddum.profile', [])
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
