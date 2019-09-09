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

      this.getGenericTracks = function () {
        return this.genericTracks;
      }

      this.getMoodId = function () {
        return this.moodId;
      }

      this.add = function(candidate){
        try{
          var candidateTracks = candidate.getGenericTracks();
          var incumbentTracks = this.getGenericTracks();
          this.genericTracks = incumbentTracks.concat(candidateTracks);
        }catch(e){
          console.log("MoodedPlaylist:add: warning: error adding playlist: " + e.message);
        }
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

    var NOT_FOUND = -1;
    function seekPlaylist(playlists, candidate) {
      var result = NOT_FOUND;
      try {
        var candidateId = candidate.getMoodId().getId();
        for (var index = 0; index < playlists.length; index++) {
          var playlist = playlists[index];
          var playlistId = playlist.getMoodId().getId();
          if (playlistId == candidateId) {
            result = index;
            break;
          }
        }
      } catch (e) {
        console.log("MoodedPlaylist:seekPlaylist: warning: returning NOT_FOUND on error: " + e.message);
      }
      return result;
    }

    MoodedPlaylist.combinePlaylists = function (arrayIncumbents, arrayCandidates) {
      if(arrayIncumbents && arrayCandidates){
        for(var index = 0; index < arrayCandidates.length; index++){
          var candidate = arrayCandidates[index];
          var indexIncumbent = seekPlaylist(arrayIncumbents,candidate);
          if(indexIncumbent == NOT_FOUND){
            arrayIncumbents.push(candidate);
          }else{
            var incumbent = arrayIncumbents[indexIncumbent];
            incumbent.add(candidate);
          }
        }
      }
      return arrayIncumbents;
    }


    /**
     * Return the constructor function
     */
    return MoodedPlaylist;

  }
})();
