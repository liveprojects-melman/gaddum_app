(function () {
  'use strict';
    
  angular
    .module('gaddum.settings')
    .factory('userSettingsService', userSettingsService)
    ;

  userSettingsService.$inject = [
    'dataApiService'
  ];

  function userSettingsService(
    dataApiService
  ) {

    function asyncGetSupportedSettings(){
      return dataApiService.asyncGetUserSettings();
    }

    function asyncGetSupportedInputTypes(){
      return dataApiService.asyncGetSupportedInputTypes();
    }

    function asyncGetNumUnset(){
      return dataApiService.asyncGetNumUnsetUserSettings();
    }

    function asyncGet(id){
      return dataApiService.asyncGetSetting(id);
    }

    function asyncSet(id, value,value_type){
      return dataApiService.asyncSetSetting(id,value,value_type);
    }

    var service = {
        asyncGetSupportedSettings:asyncGetSupportedSettings,
        asyncGetSupportedInputTypes: asyncGetSupportedInputTypes,
        asyncGet: asyncGet,
        asyncSet: asyncSet,
        asyncGetNumUnset: asyncGetNumUnset
    };

    return service;
  }
})();
