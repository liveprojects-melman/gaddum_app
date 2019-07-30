(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('GenericTrack', GenericTrack)
    ;

  GenericTrack.$inject = [

  ];
  function GenericTrack(

  ) {
    function GenericTrack(name, album, artist) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.album = album;
      this.artist = artist;

    }



    function getName(){
      return this.name;
    }

    function getAlbum(){
      return this.album;
    }

    function getArtist(){
      return this.artist;
    }


    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    GenericTrack.build = function (name, album, artist) {
      
        return new GenericTrack(
          name, album, artist
        );
 

    };

    GenericTrack.buildFromObject = function (incoming) {
      var result = new GenericTrack();

      result = angular.merge(result, incoming);

      return result;

    };


    /**
     * Return the constructor function
     */
    return GenericTrack;

  }
})();
