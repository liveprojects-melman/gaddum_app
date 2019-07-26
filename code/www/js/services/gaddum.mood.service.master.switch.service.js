(function(){
  'use strict';

  angular
    .module('gaddum.mood' )
    .factory('gaddumMoodServiceMasterSwitchService', gaddumMoodServiceMasterSwitchService);

  gaddumMoodServiceMasterSwitchService.$inject = [

    'emotionReaderService'
  ];
  function gaddumMoodServiceMasterSwitchService (

    emotionReaderService
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
        emotionReaderService.setSleep(true);
        service.state.on = false;
      }
    };

    service.init = function init() {
      service.state.on = false;
    };

    service.init();

    return service;

  }

})();
