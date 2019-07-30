(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('StatementCriteria', StatementCriteria)
    ;

  StatementCriteria.$inject = [
    'GenericTrack',
    'MoodIdentifier'
  ];
  function StatementCriteria(
    GenericTrack,
    MoodIdentifier
  ) {
    function StatementCriteria(moodId, timeStamp, location, genericTrack  ) {
      // Public properties, assigned to the instance ('this')
      this.moodId = moodId;
      this.timeStamp = timeStamp;
      this.location = location;
      this.genericTrack = genericTrack;
    }

    function getMoodId(){
      return moodId;
    }

    function getTimeStamp(){
      return timeStamp;
    }

    function getLocation(){
      return location;
    }

    function getGenerictrack(){
      return genericTrack;
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    StatementCriteria.build = function (moodIds, timeStamp, location, genericTrack) {
      
        return new StatementCriteria(
          moodId, timeStamp, location, genericTrack
        );
 
    };

    /**
     * Return the constructor function
     */
    return StatementCriteria;

  }
})();
