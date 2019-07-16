(function () {
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('mainMenuModalController', mainMenuModalController);

    mainMenuModalController.$inject = [
      'mainMenuModal',
      '$scope'

  ];
  
  function mainMenuModalController(
    mainMenuModal,
    $scope
  ) {
    var mc = angular.extend(this, {
      
    });
    $scope.mainMenuModal=mainMenuModal;
    function init() {
      mc.params =mainMenuModal.getParams();
      
    }
    init();
    function goToAbout(){
      console.log("it would go to about now")
    }
    function goToSettings(){
      console.log("it would go to settings now")
    }
    mc.goToAbout = goToAbout;
    mc.goToSettings = goToSettings;
  }
})();