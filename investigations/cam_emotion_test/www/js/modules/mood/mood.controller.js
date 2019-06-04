(function(){
  'use strict';

  angular
    .module('mood')
    .controller('moodController', moodController);
     
  moodController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    'moodService',
    'emotionReaderService',
    '$scope'
  ];

  function moodController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    moodService,
    emotionReaderService,
    $scope
  ) {

    var mc = angular.extend(this, {

      face: emotionReaderService.face,

    });


  }
})();
