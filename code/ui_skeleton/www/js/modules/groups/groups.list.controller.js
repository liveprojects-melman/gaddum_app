(function(){
  'use strict';

  angular
    .module('gaddum.groups')
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

    // attaching these methods to ng-mousedown/up on ion-items
    // makes swiping the item not cause the slidebox to move
    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };

    vm.groupsList = groupsService.groupsList;
  }
})();
