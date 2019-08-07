(function(){
  'use strict';

  angular
    .module('gaddum.mood' )
    .factory('gaddumMoodServiceMasterSwitchService', gaddumMoodServiceMasterSwitchService);

  gaddumMoodServiceMasterSwitchService.$inject = [

    'emotionReaderService',
    '$timeout'
  ];
  function gaddumMoodServiceMasterSwitchService (

    emotionReaderService,
    $timeout
  ) {
    var service = {
      state: {
        on: false
      },
      turnOn: function turnOn() {
        console.log("on!");
        service.state.on = true;
      },
      turnOff: function turnOff() {
        console.log("off!");
        $timeout(function(){
          if (emotionReaderService.isRunning) {
            emotionReaderService.setSleep(true);
            service.state.on = false;
          }
          else{
            turnOff();
          }
        },500);
        
      }
    };

    service.init = function init() {
      service.state.on = false;
    };

    service.init();

    return service;

  }

})();
