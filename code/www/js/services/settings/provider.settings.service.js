(function () {
  'use strict;'
    
  angular
    .module('gaddum.settings')
    .factory('providerSettingsService', providerSettingsService)
    ;

  providerSettingsService.$inject = [
    'dataApiService'
  ];

  function providerSettingsService(
    dataApiService
  ) {


    function asyncGetSupportedSettings(providerIdentifier){
      return dataApiService.asyncGetAllProviderSettings(providerIdentifier.getId());
    }

    function asyncGet(providerIdentifier, settingName){
      return dataApiService.asyncGetProviderSetting(providerIdentifier.getId(), settingName);
    }

    function asyncSet(providerIdentifier, settingName, value){
      var promise = null;
      if(value != null){ // catches undefined
        promise = dataApiService.asyncSetProviderSetting(providerIdentifier.getId(),settingName, value);
      }else{
        promise = dataApiService.asyncClearProviderSetting(providerIdentifier.getId(), settingName);
      }

      return promise;

    }

    var service = {
        asyncGetSupportedSettings:asyncGetSupportedSettings,
        asyncGet: asyncGet,
        asyncSet: asyncSet
    };

    return service;
  }
})();
