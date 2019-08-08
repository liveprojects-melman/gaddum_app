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
    function ImportPlaylist(name, providerPlaylistRef, providerArtworkRef, ownerName) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.provider_playlist_ref = providerPlaylistRef;
      this.provider_artwork_ref = providerArtworkRef;
      this.owner_name = ownerName;


      this.getName= function(){
        return this.name;
      }
  
      this.getProviderPlaylistRef= function(){
        return this.provider_playlist_ref;
      }
  
      this.getProviderArtworkRef= function(){
        return this.provider_artwork_ref;
      }
      this.getOwnerName= function(){
        return this.owner_name;
      }

    }



    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    ImportPlaylist.build = function (name, providerPlaylistRef, providerArtworkRef, ownerName) {
      
        return new ImportPlaylist(
          name, providerPlaylistRef, providerArtworkRef, ownerName
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
