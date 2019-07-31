(function () {
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('mainMenuModalController', mainMenuModalController);

    mainMenuModalController.$inject = [
      'mainMenuModal',
      '$scope',
      'AboutModal',
      'SettingsModal',
      'gaddumMusicProviderService'
  ];
  
  function mainMenuModalController(
    mainMenuModal,
    $scope,
    AboutModal,
    SettingsModal,
    LoginModal,
    gaddumMusicProviderService
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

    function logout(){
      mainMenuModal.close();
      gaddumMusicProviderService.asyncLogout().then(
        function(){
          LoginModal.open(null,fnCallbackOk,fnCallbackCancel);
        }
      );
    }

    function goToSettings(){
      var params= null;
      SettingsModal.open(params,fnCallbackOk,fnCallbackCancel);
      mainMenuModal.close();
    }
    function fnCallbackOk(){
      console.log("modal ok");
    }
    function fnCallbackCancel(){
      console.log("modal cancel");
    }
    mc.goToAbout = goToAbout;
    mc.goToSettings = goToSettings;
    mc.logout = logout;
  }
})();