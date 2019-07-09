/*
  userSettingsService is for simple application settings which do not interact with remote services
 */
(function(){
  'use strict';

  angular
    .module('gaddum.settings', [])
    .factory('gaddum.settings.userSettingsService', gaddumSettingsUserSettingsService);

  gaddumSettingsUserSettingsService.$inject = [
    '$window'
  ];
  function gaddumSettingsUserSettingsService(
    $window
  ) {
    var service = {
      settings: {},
      defaults: {
        //collection_play_history: null: !
        //collection_location_history: null: !
        //collection_mood_history: null: !
        //sharing_play_history: null: !
        //sharing_location_history: null: !
        //sharing_mood_history: null : !
        //profile_id: null
        //private_key : null
        //device_id: null
        //avatar_name: null
        //avatar_image: null
        first_time_help: {
          data: false,
          type: "boolean"
        }
      },
      initialised: false,
      storageName: "GaddumUserSettings"
    };

    service.restore = function restore() {
      if(service.initialised!=true) {
        try {
          service.settings = json.parse(
            $window.localStorage.getItem( service.storageName )
          );
        } catch (error) {
          console.warn("error getting "+service.storageName+" - restting storage");
          service.settings = service.defaults;
        }
      }
    };

    service.getItem = function getItem( item_key ) {
      if( service.settings.hasOwnProperty( item_key ) ) {
        if( ( service.settings[ item_key ]["data"] ) && ( service.settings[ item_key ][ "type" ] ) ) {
          var v = service.settings[ item_key ]["data"];
          switch( service.settings[ item_key ][ "type" ] ) {
          case "undefined":
            return(undefined);
            break;
          case "number":
            return(Number(v));
            break;
          case "boolean":
            return(Boolean(v));
            break;
          case "string":
          default:
            return(String(v));
            break;
          }
        }
      } else {
        throw new Error("settings_service_cannot_find_property");
      }
    };

    service.setItem = function setItem( item_key, value ) {
      service.settings[ item_key ] = {
        data: value,
        type: typeof( value )
      };
      $window.localStorage.setItem( json.stringify( service.settings ) );
    };

    service.restore();

    return service;

  }

})();
