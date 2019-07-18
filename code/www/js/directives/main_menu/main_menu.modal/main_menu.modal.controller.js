(function () {
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('mainMenuModalController', mainMenuModalController);

    mainMenuModalController.$inject = [
      'mainMenuModal',
      '$scope',
      'AboutModal'
  ];
  
  function mainMenuModalController(
    mainMenuModal,
    $scope,
    AboutModal
  ) {
    var mc = angular.extend(this, {
      
    });
    $scope.mainMenuModal=mainMenuModal;
    function init() {
      mc.params =mainMenuModal.getParams();
      
    }
    init();
    function goToAbout(){
      var params= null;
      AboutModal.open(params,fnCallbackOk,fnCallbackCancel);
      mainMenuModal.close();
    }
    function goToSettings(){
      console.log("it would go to settings now");
    }
    function fnCallbackOk(){
      console.log("modal ok");
    }
    function fnCallbackCancel(){
      console.log("modal cancel");
    }
    mc.goToAbout = goToAbout;
    mc.goToSettings = goToSettings;
  }
})();