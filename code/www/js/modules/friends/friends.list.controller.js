(function(){
  'use strict';

  angular
    .module('gaddum.friends')
    .controller('friendsListController', friendsListController);

  friendsListController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    'friendsService',
  ];

  function friendsListController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    friendsService
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

    // vm.friendsList = friendsService.friendsList;
  }
})();
