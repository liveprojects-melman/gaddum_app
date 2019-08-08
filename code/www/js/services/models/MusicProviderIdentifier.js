(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('MusicProviderIdentifier', MusicProviderIdentifier)
    ;

  MusicProviderIdentifier.$inject = [

  ];
  function MusicProviderIdentifier(

  ) {
    function MusicProviderIdentifier(
      name,
      id,
      friendly_name,
      homepage_url,

      client_id,
      redirect_url,
      token_refresh_url,
      token_exchange_url,

      access_token,
      refresh_token,
      expires_at,

      csv_genre_tags) {

      // Public properties, assigned to the instance ('this')
      this.name = name;
      this.id = id;



      this.getName = function () {
        return this.name;
      }
      this.getId = function () {
        return this.id;
      }


    }



    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    MusicProviderIdentifier.build = function ( name,
      id,
) {

      return new MusicProviderIdentifier(
        name,
        id
      );

    };

    MusicProviderIdentifier.buildFromObject = function (incoming) {
      var result = new MusicProviderIdentifier();

      result = angular.merge(result, incoming);

      return result;

    };


    /**
     * Return the constructor function
     */
    return MusicProviderIdentifier;

  }
})();
