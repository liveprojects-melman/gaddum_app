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

      this.getGenericTracks = function(){
        return this.genericTracks;
      }
      
      this.add = function(playlist){
        if(playlist){
          var source = playlist.getGenericTracks();
          if(source){
            var destination = this.genericTracks;
            source.forEach(function(candidate){
              destination.push(candidate);
            });
          }
        }
      }

  }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Playlist.build = function (genericTracks) {
      
      if(!genericTracks){
        genericTracks = [];
      }

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
