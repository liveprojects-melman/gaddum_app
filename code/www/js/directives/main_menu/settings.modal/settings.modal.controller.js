(function () {
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('settingsModalController', settingsModalController);

    settingsModalController.$inject = [
      'SettingsModal',
      '$scope',
      'settingsUserService',
      'settingIdentifier'

  ];
  
  function settingsModalController(
    SettingsModal,
    $scope,
    settingsUserService,
    settingIdentifier
  ) {
    var sc = angular.extend(this, {
      
    });
    sc.settingItem=[];
   
    function changed(setting,index){
      settingsUserService.set(setting.id,sc.settingItem[index]);
    }

    $scope.SettingsModal=SettingsModal;
    function init() {
      sc.params =SettingsModal.getParams();
      sc.settings = settingsUserService.getSupportedSettings();
      var count = 0;
      sc.settings.forEach(function(element) {
        sc.settingItem[count] = settingsUserService.get(element.id);
        count = count+1;
      });
    }
    init();
    sc.changed = changed;
  }
})();