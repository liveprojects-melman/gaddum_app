(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('GenericImportTrack', GenericImportTrack)
    ;

  GenericImportTrack.$inject = [

  ];
  function GenericImportTrack(

  ) {
    function GenericImportTrack(name, album, artist,providerTrackRef, providerArtworkRef) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.album = album;
      this.artist = artist;
      this.provider_track_ref = providerTrackRef;
      this.provider_artwork_ref = providerArtworkRef;

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

    function getProviderTrackRef(){
      return this.provider_track_ref;
    }

    function getProviderArtworkRef(){
      return this.provider_artwork_ref;
    }


    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    GenericImportTrack.build = function (name, album, artist, providerTrackRef, providerArtworkRef) {
      
        return new GenericImportTrack(
          name, album, artist, providerTrackRef, providerArtworkRef
        );
 

    };

    GenericImportTrack.buildFromObject = function (incoming) {
      var result = new GenericImportTrack();

      result = angular.merge(result, incoming);

      return result;

    };


    /**
     * Return the constructor function
     */
    return GenericImportTrack;

  }
})();
