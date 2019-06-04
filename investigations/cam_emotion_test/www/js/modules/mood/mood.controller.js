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
    $scope
  ];

  function moodController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    moodService,
    emotionReaderService
  ) {
    console.log("eRS",emotionReaderService);
    var mc = angular.extend(this, {

      face: emotionReaderService.face,
      test: false

    });
    console.log("??",mc.face);
    console.log("???",mc.face.detected);
    var dump = function dump(){
      console.log("mc.face.detected = ",mc.face.detected);
      console.log("eRS.face.detected = ",emotionReaderService.face.detected);
      mc.test=!mc.test;
      /*       if(mc.test===true)
      {
        mc.test=false;
      }else{
        mc.test=true;
      }
 */      console.log("test",mc.test);
    };
    var x = setInterval(dump,1000);
  }
})();
