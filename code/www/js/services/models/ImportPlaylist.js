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
    function ImportPlaylist(id, name, providerPlaylistRef, providerArtworkRef, ownerName) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.name = name;
      this.provider_playlist_ref = providerPlaylistRef;
      this.provider_artwork_ref = providerArtworkRef;
      this.owner_name = ownerName;

      this.getId = function(){
        return this.id;
      }

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
    ImportPlaylist.build = function (id, name, providerPlaylistRef, providerArtworkRef, ownerName) {
      
        return new ImportPlaylist(
          id, name, providerPlaylistRef, providerArtworkRef, ownerName
        );
 

    };





    /**
     * Return the constructor function
     */
    return ImportPlaylist;

  }
})();
