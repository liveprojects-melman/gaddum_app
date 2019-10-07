(function () {
  'use strict';
    
  angular
    .module('gaddum.settings')
    .factory('userSettingsService', userSettingsService)
    ;

  userSettingsService.$inject = [
    '$q',
    'dataApiService'
  ];



  function userSettingsService(
    $q,
    dataApiService
  ) {


    var gFnOnChange = null;


    function notifyChange(){
      if(gFnOnChange){
        gFnOnChange();
      }
    }

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
      return dataApiService.asyncSetSetting(id,value,value_type).then(
        notifyChange,
        notifyChange
      );
      
    }

    function initialise(fnOnChange){
      gFnOnChange = fnOnChange;
    }

    var service = {
        initialise: initialise,
        asyncGetSupportedSettings:asyncGetSupportedSettings,
        asyncGetSupportedInputTypes: asyncGetSupportedInputTypes,
        asyncGet: asyncGet,
        asyncSet: asyncSet,
        asyncGetNumUnset: asyncGetNumUnset

    };

    return service;
  }
})();
