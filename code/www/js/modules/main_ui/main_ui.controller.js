(function(){
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('main_uiController', main_uiController);

  main_uiController.$inject = [
    '$scope',
    '$ionicSlideBoxDelegate',
    'gaddumStreamingService'
  ];

  function main_uiController(
    $scope,
    $ionicSlideBoxDelegate,
    gaddumStreamingService
  ) {
    var mlc = angular.extend(this, {

    });

    mlc.playeropen = "playeropen";//gaddumStreamingService.state;

    $scope.$on('player:ready', function(event,data) {
//      console.log("BroadcastGot: ",data);
      //vm.playeropen = 
      $scope.playeropen = data?"playeropen":""; //vm.playeropen;
      //$scope.$apply();
    });

  }

})();
