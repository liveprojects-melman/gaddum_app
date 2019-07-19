(function () {
  'use strict';
    
  angular
    .module('dbApi')
    .factory('userSettingsService', userSettingsService)
    ;

  userSettingsService.$inject = [
    'dataApi'
  ];

  function userSettingsService(
    dataApi
  ) {

    function asyncGetSupportedSettings(){
      return dataApi.getUserSettings();
    }

    function asyncGetSupportedInputTypes(){
      return dataApi.asyncGetSupportedSettings();
    }

    function asyncGetNumUnset(){
      return dataApi.getNumUnsetUserSettings();
    }

    function asyncGet(id){
      return dataApi.asyncGetSetting(id);
    }

    function asyncSet(id, value){
      return dataApi.asyncSetSetting(id,value);
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
