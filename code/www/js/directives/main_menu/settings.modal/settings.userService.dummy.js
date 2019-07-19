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
          collection_play_history:null,
          collection_location_history:null,
          collection_mood_history:false,
          sharing_play_history:false,
          sharing_location_history:false,
          sharing_mood_history:false,
          first_time_help:false

      };
      
      function getSupportedSettings(){
          var arrayOfSettings=[];
          arrayOfSettings[0] = settingIdentifier.build("collection_play_history","Collect Play History","boolean",false);
          arrayOfSettings[1] = settingIdentifier.build("collection_location_history","Collect Location History","boolean",false);
          arrayOfSettings[2] = settingIdentifier.build("collection_mood_history","Collect Mood History","boolean",false);
          arrayOfSettings[3] = settingIdentifier.build("sharing_play_history","Share Play History","boolean",false);
          arrayOfSettings[4] = settingIdentifier.build("sharing_location_history","Share Location History","boolean",false);
          arrayOfSettings[5] = settingIdentifier.build("sharing_mood_history","Share Mood History","boolean",false);
          arrayOfSettings[6] = settingIdentifier.build("first_time_help","First Time Help","boolean",false);
          return arrayOfSettings;
          
      }
      function set(id,value){
          dict[id]=value;
      }
      function get(id){
          return dict[id];
      }
      function getDefault(id){
        return false;
      }
    var service = {
        getSupportedSettings:getSupportedSettings,
        set:set,
        get:get,
        getDefault:getDefault
        
    };

    return service;
  }
})();
