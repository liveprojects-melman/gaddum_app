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

    function asyncSet(id, value, value_type){
      var promise = null;
      if(value != null){ // catches undefined
        promise = dataApiService.asyncSetSetting(id, value, value_type);
      }else{
        promise = dataApiService.asyncClearSetting(id, value_type);
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
