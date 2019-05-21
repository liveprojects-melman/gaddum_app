(function(){
  'use strict';

  angular
    .module('groups')
    .controller('groupsListController', groupsListController);

  groupsListController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    'groupsService',
  ];

  function groupsListController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    groupsService
  ) {
    var vm = angular.extend(this, {

    });

    vm.groupsList = groupsService.groupsList;
  }
})();
