(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('TrackReference', TrackReference)
    ;

  TrackReference.$inject = [

  ];
  function TrackReference(

  ) {
    function TrackReference(id, web_uri, player_uri, thumbnail_uri, provider_id, track_id) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.web_uri = web_uri;
      this.player_uri = player_uri;
      this.thumbnail_uri = thumbnail_uri;
      this.provider_id = provider_id;
      this.track_id = track_id;

      this.getId = function () {
        return this.id;
      }

      this.getWebUri = function () {
        return this.web_uri;
      }

      this.getPlayerUri = function () {
        return this.player_uri;
      }

      this.getThumbnailUri = function () {
        return this.thumbnail_uri;
      }

      this.getProviderId = function(){
        return this.provider_id;
      }

      this.getTrackId = function(){
        return this.track_id;
      }

    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TrackReference.build = function (id, web_uri, player_uri, thumbnail_uri, provider_id, track_id) {

      if (!id) id = "";
      if (!web_uri) web_uri = "";
      if (!player_uri) player_uri = "";
      if (!thumbnail_uri) thumbnail_uri = "";
      if(!provider_id) provider_id = "";
      if(!track_id) track_id = "";

      return new TrackReference(
        id, web_uri, player_uri, thumbnail_uri, provider_id, track_id
      );


    };

    TrackReference.buildFromObject = function (incoming) {
      var result = new TrackReference();

      result = angular.merge(result, incoming);

      return result;

    };


    /**
     * Return the constructor function
     */
    return TrackReference;

  }
})();
