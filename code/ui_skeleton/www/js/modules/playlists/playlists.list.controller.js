(function(){
  'use strict';

  angular
    .module('playlists')
    .controller('playlistsListController', playlistsListController);

  playlistsListController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    'playlistsService',
  ];

  function playlistsListController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    playlistsService
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

    vm.groupsList = playlistsService.playlistsList;
  }
})();
