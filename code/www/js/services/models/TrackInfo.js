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



    function TrackInfo(name, album, artist, duration_ms, web_uri, thumbnail_uri, player_uri, provider_id) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.album = album;
      this.artist = artist;
      this.duration_ms = duration_ms;
      this.web_uri = web_uri;
      this.thumbnail_uri = thumbnail_uri;
      this.player_uri = player_uri;
      this.provider_id = provider_id;

    this. getName = function(){
      return this.name;
    }

    this.getAlbum = function(){
      return this.album;
    }

    this.getArtist = function(){
      return this.artist;
    }

    this.getDuration_ms = function(){
      return this.duration_ms;
    }

    this.getWebUri = function(){
      return this.web_uri;
    }

    this.getArtworkUri = function(){
      return this.thumbnail_uri;
    }

    this.getPlayerUri = function(){
      return this.player_uri;
    }

    this.getServiceProvider = function(){
      return this.provider_id;
    }

  }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TrackInfo.build = function (name, album, artist, duration_ms, web_uri, thumbnail_uri, player_uri, provider_id) {

      
      if(!name) name = "";
      if(!album) album = "";
      if(!artist) artist = "";
      if(!duration_ms) duration_ms =0;
      if(!web_uri) web_uri ="";
      if(!thumbnail_uri) thumbnail_uri = "";
      if(!player_uri) player_uri = "";
      if(!provider_id) provider_id = "";

        return new TrackInfo(
          name, album, artist, duration_ms, web_uri, thumbnail_uri, player_uri, provider_id
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
