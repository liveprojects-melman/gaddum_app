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
    function MoodedSearchCriteria(moodIds, timeStamp, location, genres  ) {
      // Public properties, assigned to the instance ('this')
      this.moodIds = moodIds;
      this.timeStamp = timeStamp;
      this.location = location;
      this.genres = genres;
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    MoodedSearchCriteria.build = function (moodIds, timeStamp, location, genres) {
      
        return new MoodedSearchCriteria(
          moodIds, timeStamp, location, genres
        );
 

    };

    /**
     * Return the constructor function
     */
    return MoodedSearchCriteria;

  }
})();
