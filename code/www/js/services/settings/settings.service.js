(function () {
  'use strict;'
    
  angular
    .module('gaddum_settings')
    .factory('allSettingsService', allSettingsService)
    ;

  allSettingsService.$inject = [
    dataApi
  ];

  function allSettingsService(
    
  ) {

    function asyncGetSupportedSettings(){
      return dataApi.getAllSettings();
    }

    function asyncGetSupportedInputTypes(){
      return dataApi.asyncGetSupportedSettings();
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
        asyncSet: asyncSet
    };

    return service;
  }
})();
