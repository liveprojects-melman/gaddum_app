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
  ];

  function moodController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    moodService
  ) {
    var vm = angular.extend(this, {

    });

  }
})();
