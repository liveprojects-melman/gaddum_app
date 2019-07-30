(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('Playlist', Playlist)
    ;

  Playlist.$inject = [

  ];
  function Playlist(

  ) {
    function Playlist(genericTracks) {
      // Public properties, assigned to the instance ('this')
      this.genericTracks = genericTracks;

    }

    function getGenericTracks(){
      return genericTracks;
    }


    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Playlist.build = function (genericTracks) {
      
        return new Playlist(
          genericTracks
        );
 

    };

    /**
     * Return the constructor function
     */
    return Playlist;

  }
})();
