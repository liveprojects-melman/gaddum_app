(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('ImportPlaylist', ImportPlaylist)
    ;

  ImportPlaylist.$inject = [

  ];
  function ImportPlaylist(

  ) {
    function ImportPlaylist(name, providerPlaylistRef, providerArtworkRef) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.provider_playlist_ref = providerPlaylistRef;
      this.provider_artwork_ref = providerArtworkRef;

    }



    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    ImportPlaylist.build = function (name, providerPlaylistRef, providerArtworkRef) {
      
        return new ImportPlaylist(
          name, providerPlaylistRef, providerArtworkRef
        );
 

    };

    ImportPlaylist.buildFromObject = function (incoming) {
      var result = new ImportPlaylist();

      result = angular.merge(result, incoming);

      return result;

    };


    /**
     * Return the constructor function
     */
    return ImportPlaylist;

  }
})();
