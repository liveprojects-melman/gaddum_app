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
    function TrackInfo(name, album, artist, duration_s, web_uri, artwork_uri, player_uri, service_provider) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.album = album;
      this.artist = artist;
      this.duration_s = duration_s;
      this.web_uri = web_uri;
      this.artwork_uri = artwork_uri;
      this.player_uri = player_uri;
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

    this.getWebUri = function(){
      return this.web_uri;
    }

    this.getArtworkUri = function(){
      return this.artwork_uri;
    }

    this.getPlayerUri = function(){
      return this.player_uri;
    }

    this.getServiceProvider = function(){
      return this.service_provider;
    }

  }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TrackInfo.build = function (name, album, artist, duration_s, web_uri, artwork_uri, player_uri, service_provider) {

      
      if(!name) name = "";
      if(!album) album = "";
      if(!artist) artist = "";
      if(!duration_s) duration_s =0;
      if(!web_uri) web_uri ="";
      if(!artwork_uri) artwork_uri = "";
      if(!player_uri) player_uri = "";
      if(!service_provider) service_provider = "";

        return new TrackInfo(
          name, album, artist, duration_s, web_uri, artwork_uri, player_uri, service_provider
        );
 

    };

    /**
     * Return the constructor function
     */
    return TrackInfo;

  }
})();
