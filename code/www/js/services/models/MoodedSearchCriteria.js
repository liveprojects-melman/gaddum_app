(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('MoodedSearchCriteria', MoodedSearchCriteria)
    ;

  MoodedSearchCriteria.$inject = [
    'MoodIdentifier',
    'TimeStamp',
    'Location'
  ];
  function MoodedSearchCriteria(
    MoodIdentifier,
    TimeStamp,
    Location
  ) {
    function MoodedSearchCriteria(moodIds, timeStamp, location  ) {
      // Public properties, assigned to the instance ('this')
      this.moodIds = moodIds;
      this.timeStamp = timeStamp;
      this.location = location;


      this.getMoodIds = function(){
        return this.moodIds;
      } 

      this.getTimestamp = function(){
        return this.timeStamp;
      }

      this.getLocation = function(){
        return this.location;
      }




    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    MoodedSearchCriteria.build = function (moodIds, timeStamp, location) {

      var candidate = null;

        if(!moodIds){
          moodIds = null;
        }else{
          if(typeof(moodIds) != 'array'){
            throw("MoodedSearchCriteria.build: moodIds needs to be an array.");
          }
          if(moodIds.length > 0){
            candidate = moodIds[0];
            if(!candidate || (!(candidate instanceof MoodIdentifier))){
              throw("MoodedSearchCriteria.build: moodIds needs to be an array of MoodIds");
            }
          }
        }
        
        if(!timeStamp){
          timeStamp = null;
        }else{
          if(!timeStamp instanceof TimeStamp){
            throw("MoodedSearchCriteria.build: timeStamp needs to be a TimeStamp");
          }
        }

        if(!location){
          location = null;
        }else{
          if(!location instanceof Location){
            throw("MoodedSearchCriteria.build: location needs to be a Location");
          }
        }

        return new MoodedSearchCriteria(
          moodIds, timeStamp, location
        );
 

    };

    /**
     * Return the constructor function
     */
    return MoodedSearchCriteria;

  }
})();
