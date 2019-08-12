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
        on: false,
        count:0
      },
      turnOn: function turnOn() {
        console.log("on!");
        service.state.on = true;
      },
      turnOff: function turnOff() {
        console.log("off!");
        $timeout(function(){
          if (emotionReaderService) {
            if (emotionReaderService.isRunning) {
              console.log("offForReal");
              emotionReaderService.setSleep(true);
              service.state.on = false;
            }
            else{
              if(emotionReaderService.isSleeping){
                service.state.on = false;
              }
              else if(service.state.count < 10){
                service.state.count = service.state.count+1;
                turnOff();
              }
              else{
                console.log("error", emotionReaderService);
              }
            }
          }
          else{
            turnOff();
          }
        },1000);
        
      }
    };

    service.init = function init() {
      service.state.on = false;
    };

    service.init();

    return service;

  }

})();
