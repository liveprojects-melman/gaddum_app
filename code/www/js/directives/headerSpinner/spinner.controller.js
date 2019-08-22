
(function () {
    'use strict';
  
    angular
      .module('gaddum.spinner')
      .controller('spinnerController', spinnerController);
  
      spinnerController.$inject = [
      'spinnerService'
  
    ];
  
    function spinnerController(
        spinnerService
    ) {
      var vm = angular.extend(this, {
        spin: false
      });
      function init(){
        spinnerService.setCallbackFunction(changeSpinner);
      }
      init();
      function changeSpinner(isOn){
        if(isOn){
            vm.spin = true;
        }
        else{
            vm.spin = false;
        }
      }
      
    }
  })();
  