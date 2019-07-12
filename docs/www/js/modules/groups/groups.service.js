(function() {
  'use strict;'

  angular
    .module('gaddum.groups')
    .factory('groupsService', groupsService)
  ;

  groupsService.$inject = [
    '$http'
  ];
  function groupsService(
    $http
  ) {
    var service={};

    service.groupsList = {};

    // dummy some data
    angular.merge(service.groupsList, {
      "1":{order:1,
           name:"Saturday Group"
      },
      "2":{order:2,
           name:"9B"
      },
      "3":{order:3,
           name:"School"
          },
      "4":{
        order:4,
        name:"four"
      },
      "5":{
        order:5,
        name:"five"
      }
    });

    return service;
  }
})();
