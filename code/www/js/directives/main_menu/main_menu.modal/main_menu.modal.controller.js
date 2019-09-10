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
      'loginModal',
      'gaddumMusicProviderService',
      'pubsubService'
  ];
  
  function mainMenuModalController(
    mainMenuModal,
    $scope,
    AboutModal,
    SettingsModal,
    loginModal,
    gaddumMusicProviderService,
    pubsubService
  ) {
    var mc = angular.extend(this, {
      
    });
    $scope.mainMenuModal=mainMenuModal;
    mc.isLoggedIn = false;
    function init() {
      mc.params =mainMenuModal.getParams();
      gaddumMusicProviderService.asyncIsLoggedIn().then(function(result){
        console.log("inside",result);
        mc.isLoggedIn = result;
        console.log("check1",mc.isLoggedIn);
      });
      console.log("check2",mc.isLoggedIn);
    }
    init();
    function goToAbout(){
      var params= null;
      AboutModal.open(params,fnCallbackOk,fnCallbackCancel);
      mainMenuModal.close();
    }

    function logout(){
      console.log("logout");
      gaddumMusicProviderService.asyncLogout().then(
        function(){
          console.log("logged out");
          loginModal.promiseLogin();
        }
      );
      mainMenuModal.close();
    }
    function login(){
      console.log("logging in");
      mainMenuModal.close();
      loginModal.promiseLogin();
    }

    function goToSettings(){
      var params= null;
      SettingsModal.open(params,fnCallbackOk,fnCallbackCancel);
      mainMenuModal.close();
    }

    function fnCallbackOk(){
      pubsubService.asyncPublish("userSettingChange");
    }

    function fnCallbackCancel(){
      pubsubService.asyncPublish("userSettingChange");
    }
    mc.goToAbout = goToAbout;
    mc.goToSettings = goToSettings;
    mc.logout = logout;
    mc.login = login;
  }
})();