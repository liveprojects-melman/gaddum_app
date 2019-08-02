(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('MoodedPlaylist', MoodedPlaylist)
    ;

  MoodedPlaylist.$inject = [
    'MoodIdentifier',
    'GenericTrack',
    'Playlist'
  ];
  function MoodedPlaylist(
    MoodIdentifier,
    GenericTrack,
    Playlist
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
    MoodedPlaylist.build = function (moodId, playlist) {

      var result = null;
      if ((moodId instanceof MoodIdentifier) && (playlist instanceof Playlist)) {

        result = new MoodedPlaylist(
          moodId,
          playlist.getGenericTracks()
        );
      } else {
        throw ("MoodedPlaylist must have non-null MoodIdentifier and Playlist");
      }

      return result;


    };

    /**
     * Return the constructor function
     */
    return MoodedPlaylist;

  }
})();
