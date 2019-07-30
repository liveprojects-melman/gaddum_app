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
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    MoodedPlaylist.build = function (moodId, playlist) {
      
        var genericTracks = null;

        try{
          genericTracks = playlist.genericTracks;  
        }catch(e){
          // playlist was null
        }

        return new MoodedPlaylist(
          moodId,
          genericTracks
        );
 

    };

    /**
     * Return the constructor function
     */
    return MoodedPlaylist;

  }
})();
