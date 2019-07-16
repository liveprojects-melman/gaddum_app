(function () {
  'use strict';

  angular
    .module('gaddum.mood')
    .controller('moodSelectModalController', moodSelectModalController);

    moodSelectModalController.$inject = [
      'moodSelectModal',
      '$scope'

  ];
  
  function moodSelectModalController(
    moodSelectModal,
    $scope
  ) {
    var mc = angular.extend(this, {
      
    });
    $scope.moodSelectModal=moodSelectModal;
    function init() {
      mc.params =moodSelectModal.getParams();
      
    }
    init();
    function selectEmo(emotion){
      moodSelectModal.callback(emotion);
      moodSelectModal.close();
    }
    mc.selectEmo = selectEmo;
  }
})();