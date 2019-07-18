(function () {
  'use strict;'
    
  angular
    .module('gaddum.main_ui')
    .factory('settingsUserService', settingsUserService)
    ;

  settingsUserService.$inject = [
    'settingIdentifier'
  ];
  function settingsUserService(
    settingIdentifier
  ) {

      var dict = {
          collection_play_history:false,
          collection_location_history:false,
          collection_mood_history:false,
          sharing_play_history:false,
          sharing_location_history:false,
          sharing_mood_history:false,
          first_time_help:false

      };
      
      function getSupportedSettings(){
          var arrayOfSettings=[];
          arrayOfSettings[0] = settingIdentifier.build("collection_play_history","Collect Play History","boolean");
          arrayOfSettings[1] = settingIdentifier.build("collection_location_history","Collect Location History","boolean");
          arrayOfSettings[2] = settingIdentifier.build("collection_mood_history","Collect Mood History","boolean");
          arrayOfSettings[3] = settingIdentifier.build("sharing_play_history","Share Play History","boolean");
          arrayOfSettings[4] = settingIdentifier.build("sharing_location_history","Share Location History","boolean");
          arrayOfSettings[5] = settingIdentifier.build("sharing_mood_history","Share Mood History","boolean");
          arrayOfSettings[6] = settingIdentifier.build("first_time_help","First Time Help","boolean");
          return arrayOfSettings;
          
      }
      function set(id,value){
          dict[id]=value;
      }
      function get(id){
          return dict[id];
      }
    var service = {
        getSupportedSettings:getSupportedSettings,
        set:set,
        get:get
        
    };

    return service;
  }
})();
