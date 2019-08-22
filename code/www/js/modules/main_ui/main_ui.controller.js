(function(){
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('main_uiController', main_uiController);

  main_uiController.$inject = [
    '$scope',
    '$ionicSlideBoxDelegate'
  ];

  function main_uiController(
    $scope,
    $ionicSlideBoxDelegate
  ) {
    var mlc = angular.extend(this, {

    });

    mlc.playeropen = "";
    mls.playerHasBeenOpened = false;

    $scope.$on('player:ready', function(event,data) {
      mlc.playeropen = data?"playeropen":"";
      if(data) {
        mlc.playerHasBeenOpened = true;
      }
    });

    $scope.$on('marquee:read', function(event,data) {
      mlc.playeropen = data?"marqueeopen":(mlc.playerHasBeenOpened?"playeropen":"");
    });
  }

})();
