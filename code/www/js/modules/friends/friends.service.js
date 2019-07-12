(function() {
  'use strict;'

  angular
    .module('gaddum.friends')
    .factory('friendsService', friendsService)
  ;

  friendsService.$inject = [
    '$http'
  ];
  function friendsService(
    $http
  ) {
    var service={};

    service.friendsList = {};

    // dummy some data
    angular.merge(service.friendsList, {
      "1":{order:1,
           name:"Alice Digitallabs"
      },
      "2":{order:2,
           name:"Brenda Labsdigital"
      },
      "3":{order:3,
           name:"Calderdale Junxion"
      }
    });

    return service;
  }
})();
