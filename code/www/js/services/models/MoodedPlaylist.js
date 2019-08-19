(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('MoodedPlaylist', MoodedPlaylist)
    ;

  MoodedPlaylist.$inject = [
    'MoodIdentifier',
    'GenericTrack'
  ];
  function MoodedPlaylist(
    MoodIdentifier,
    GenericTrack
  ) {
    function MoodedPlaylist(moodId, genericTracks) {
      // Public properties, assigned to the instance ('this')
      this.genericTracks = genericTracks;
      this.moodId = moodId;

      this.getGenericTracks = function(){
        return this.genericTracks;
      }

      this.getMoodId = function(){
        return this.moodId;
      }


    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    MoodedPlaylist.build = function (moodId, genericTracks) {

      var result = null;
      if ((moodId instanceof MoodIdentifier)) {

        result = new MoodedPlaylist(
          moodId,
          genericTracks
        );
      } else {
        throw ("MoodedPlaylist must have non-null MoodIdentifier");
      }

      return result;


    };

    /**
     * Return the constructor function
     */
    return MoodedPlaylist;

  }
})();
