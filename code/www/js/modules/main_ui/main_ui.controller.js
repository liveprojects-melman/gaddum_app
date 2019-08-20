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

    mlc.playeropen = "playeropen";

    $scope.$on('player:ready', function(event,data) {
      console.log("BroadcastGot: ",data);
      //vm.playeropen = 
      $scope.playeropen = data?"playeropen":""; //vm.playeropen;
      //$scope.$apply();
    });

  }

})();
