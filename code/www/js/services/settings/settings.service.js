(function () {
  'use strict;'
    
  angular
    .module('gaddum.settings')
    .factory('allSettingsService', allSettingsService)
    ;

  allSettingsService.$inject = [
    'dataApiService'
  ];

  function allSettingsService(
    dataApiService
  ) {

    function asyncGetSupportedSettings(){
      return dataApiService.asyncGetAllSettings();
    }

    function asyncGet(id){
      return dataApiService.asyncGetSetting(id);
    }

    function asyncSet(id, value, type){
      return dataApiService.asyncSetSetting(id, value, type);
    }

    var service = {
        asyncGetSupportedSettings:asyncGetSupportedSettings,
        asyncGet: asyncGet,
        asyncSet: asyncSet
    };

    return service;
  }
})();
