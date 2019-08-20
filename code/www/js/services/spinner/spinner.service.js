(function () {
    'use strict;'
  
    angular
      .module('gaddum.spinner' )
      .factory('spinnerService', spinnerService)
      ;
  
      spinnerService.$inject = [
      
    ];
    function spinnerService(
     
    ) {
      
      var callbackFunction = null;
      function setCallbackFunction(callbackFun){
          callbackFunction = callbackFun;
      }
      function spinnerOff(){
          callbackFunction(false);
      }
      function spinnerOn(){
          callbackFunction(true);
      }
  
      var service = {
        setCallbackFunction:setCallbackFunction,
        spinnerOn:spinnerOn,
        spinnerOff:spinnerOff
      };
  
      return service;
    }
  })();
  