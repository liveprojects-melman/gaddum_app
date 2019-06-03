(function() {
  'use strict;'

  angular
    .module('gifts', [])
    .factory('giftsService', giftsService)
  ;

  giftsService.$inject = [
    '$http'
  ];
  function giftsService(
    $http
  ) {
    var service={};

    service.giftsList = {};

    // dummy some data
    angular.merge(service.giftsList, {
      "1":{sender:1,
           state:1,
           dateTime:0,
           body:"First Gift"
          },
      "2":{sender:1,
           state:2,
           dateTime:1,
           body:"Second Gift"
          },
      "3":{sender:2,
           state:3,
           dateTime:2,
           body:"Third Gift"
          }
    });

    return service;
  }
})();
