(function() {
  'use strict;'

  angular
    .module('gaddum.browse', [])
    .factory('browseService', browseService)
  ;

  browseService.$inject = [
    '$http'
  ];
  function browseService(
    $http
  ) {
    var service={};

    service.browseList = {};

    // dummy some data
    angular.merge(service.browseList, {
      "1":{sender:1,
           state:1,
           dateTime:0,
           body:"First Message"
          },
      "2":{sender:1,
           state:2,
           dateTime:1,
           body:"Second Message"
          },
      "3":{sender:2,
           state:3,
           dateTime:2,
           body:"Third Message"
          }
    });

    return service;
  }
})();
