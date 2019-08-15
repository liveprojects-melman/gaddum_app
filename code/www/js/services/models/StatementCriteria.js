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
    function StatementCriteria(moodId,  genericTrack  ) {
      // Public properties, assigned to the instance ('this')
      this.moodId = moodId;
      this.genericTrack = genericTrack;
      
      this.getMoodId = function(){
        return this.moodId;
      }
      this.getGenericTrack = function(){
        return this.genericTrack;
      }
    }


    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    StatementCriteria.build = function (moodId, genericTrack) {
      
        return new StatementCriteria(
          moodId, genericTrack
        );
 
    };

    /**
     * Return the constructor function
     */
    return StatementCriteria;

  }
})();
