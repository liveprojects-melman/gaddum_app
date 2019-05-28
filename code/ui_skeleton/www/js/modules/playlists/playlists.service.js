(function() {
  'use strict;'

  angular
    .module('playlists', [])
    .factory('playlistsService', playlistsService)
  ;

  playlistsService.$inject = [
    '$http'
  ];
  function playlistsService(
    $http
  ) {
    var service={};

    service.playlistsList = {};

    // dummy some data
    angular.merge(service.playlistsList, {
      "1":{order:1,
           name:"Great Tunes"
      },
      "2":{order:2,
           name:"Great Choons"
      },
      "3":{order:3,
           name:"Grate Choonz"
      }
    });

    return service;
  }
})();
