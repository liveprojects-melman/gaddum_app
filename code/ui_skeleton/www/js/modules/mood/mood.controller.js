(function(){
  'use strict';

  angular
    .module('gaddum.mood')
    .controller('moodController', moodController);

  moodController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    'moodService',
    'gaddumMoodServiceMasterSwitchService'
  ];

  function moodController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    moodService,
    gaddumMoodServiceMasterSwitchService
  ) {
    var mc = angular.extend(this, {

    });
    mc.moodState = gaddumMoodServiceMasterSwitchService.state;


  }
})();
