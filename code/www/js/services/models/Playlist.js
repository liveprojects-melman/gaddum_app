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
    function Playlist(id, name, genericTracks) {
      // Public properties, assigned to the instance ('this')

      this.id = id;
      this.name = name;
      this.genericTracks = genericTracks;


      this.getName = function(){
        return this.name;
      }

      this.getId = function(){
        return this.id;
      }

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
    Playlist.build = function (id, name, genericTracks) {
      

      if(!genericTracks){
        genericTracks = [];
      }

        return new Playlist(
          id,
          name,
          genericTracks
        );
 

    };

    /**
     * Return the constructor function
     */
    return Playlist;

  }
})();
