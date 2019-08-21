(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('EventIdentifier', EventIdentifier)
    ;

  EventIdentifier.$inject = [

  ];
  function EventIdentifier(

  ) {

    EventIdentifier.TRACK_START  = -1; // the current track has started / resumed playing
    EventIdentifier.TRACK_END = -2; // the current track has completed playing
    EventIdentifier.TRACK_PAUSED = -3 // the playing of the selected track has been paused
    EventIdentifier.TRACK_PROGRESS_PERCENT = -4, // progress through selected track
    EventIdentifier.TRACK_ERROR = -4; // an error has occured playing the track / the track is not available.
    EventIdentifier.LOGGED_OUT = -5; // the music provider has been logged out
    EventIdentifier.LOGGED_IN = -6; // the music provider has been logged in

    function EventIdentifier(code, payload) {
      // Public properties, assigned to the instance ('this')
      this.code = code;
      this.payload = payload;

    this.getCode = function() {
      return this.code;
    }
    this.getPayload = function() {
      return this.payload;
    }
  };
    

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    EventIdentifier.build = function (code, payload) {
      
        return new EventIdentifier(
          code, payload
        );

    };

    


    /**
     * Return the constructor function
     */
    return EventIdentifier;

  }
})();
