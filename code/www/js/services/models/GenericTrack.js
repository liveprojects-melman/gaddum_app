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
    function GenericTrack(id, name, album, artist, duration_s) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.name = name;
      this.album = album;
      this.artist = artist;
      this.duration_s = duration_s;

      this.getId = function () {
        return this.id;
      }

      this.getName = function () {
        return this.name;
      }

      this.getAlbum = function () {
        return this.album;
      }

      this.getArtist = function () {
        return this.artist;
      }

      this.getDuration_s = function(){
        return this.duration_s;
      }

    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    GenericTrack.build = function (id, name, album, artist, duration_s) {

      if (!id) id = "";
      if (!name) name = "";
      if (!album) album = "";
      if (!artist) artist = "";
      if(!duration_s) duration_s = 0;

      return new GenericTrack(
        id, name, album, artist, duration_s
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
