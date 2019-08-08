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
    function GenericTrack(id, name, album, artist) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.name = name;
      this.album = album;
      this.artist = artist;

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

    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    GenericTrack.build = function (id, name, album, artist) {

      if (!id) id = "";
      if (!name) name = "";
      if (!album) album = "";
      if (!artist) artist = "";

      return new GenericTrack(
        id, name, album, artist
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
