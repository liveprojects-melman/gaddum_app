(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('TrackInfo', TrackInfo)
    ;

  TrackInfo.$inject = [

  ];
  function TrackInfo(

  ) {
    function TrackInfo(name, album, artist, duration_s, artwork_url, track_reference, service_provider) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.album = album;
      this.artist = artist;
      this.duration_s = duration_s;
      this.artwork_url = artwork_url;
      this.track_reference = track_reference;
      this.service_provider = service_provider;

    this. getName = function(){
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

    this.getArtworkUrl = function(){
      return this.artwork_url;
    }

    this.getTrackReference = function(){
      return this.track_reference;
    }

    this.getServiceProvider = function(){
      return this.service_provider;
    }

  }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TrackInfo.build = function (name, album, artist, duration_s, artwork_url, track_reference, service_provider) {

      
      if(!name) name = "";
      if(!album) album = "";
      if(!artist) artist = "";
      if(!duration_s) duration_s =0;
      if(!artwork_url) artwork_url = "";
      if(!track_reference) track_reference = "";
      if(!service_provider) service_provider = "";

        return new TrackInfo(
          name, album, artist, duration_s, artwork_url, track_reference, service_provider
        );
 

    };

    TrackInfo.buildFromObject = function (incoming) {
      var result = new TrackInfo();

      result = angular.merge(result, incoming);

      return result;

    };


    /**
     * Return the constructor function
     */
    return TrackInfo;

  }
})();
