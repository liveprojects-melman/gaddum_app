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
    function GenericImportTrack(id,name, album, artist, duration_s,providerTrackRef, providerArtworkRef) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.name = name;
      this.album = album;
      this.artist = artist;
      this.duration_s = duration_s;
      this.provider_track_ref = providerTrackRef;
      this.provider_artwork_ref = providerArtworkRef;

    
 

    this.getId = function(){
      return this.id;
    }

    this.getName = function(){
      return this.name;
    }

    this.getAlbum = function(){
      return this.album;
    }

    this.getArtist = function(){
      return this.artist;
    }

    this.getDuration_s = function(){
      return this.duration_s;
    }

    this.getProviderTrackRef = function(){
      return this.provider_track_ref;
    }

    this.getProviderArtworkRef = function(){
      return this.provider_artwork_ref;
    }

  }
    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    GenericImportTrack.build = function (id, name, album, artist, duration_s, providerTrackRef, providerArtworkRef) {
      
        return new GenericImportTrack(
          id, name, album, artist, duration_s, providerTrackRef, providerArtworkRef
        );
 

    };




    /**
     * Return the constructor function
     */
    return GenericImportTrack;

  }
})();
