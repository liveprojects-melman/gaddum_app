(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('PlaylistIdentifier', PlaylistIdentifier)
    ;

  PlaylistIdentifier.$inject = [

  ];
  function PlaylistIdentifier(

  ) {
    function PlaylistIdentifier(id,name,isGift, isMoodEnabled) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.name = name;
      this.isGift = isGift;
      this.isMoodEnabled;
    

    this.getName = function(){
      return this.name;
    }

    this.setName = function(name){
      this.name = name;
    }

    this.getId = function(){
      return this.id;
    }

    this.isGift = function(){
      return this.isGift;
    }

    this.isMoodEnabled = function(){
      return isMoodEanbled;
    }

    this.setMoodEnabled = function(enabled){
      this.setMoodEnabled = enabled;
    }

  }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    PlaylistIdentifier.build = function (id, name, isMoodEnabled, isGift) {
      
        return new PlaylistIdentifier(
          id, name, isMoodEnabled, isGift
        );
 

    };

    PlaylistIdentifier.buildFromObject = function (incoming) {
      var result = new PlaylistIdentifier();

      result = angular.merge(result, incoming);




      return result;

    };

    /**
     * Return the constructor function
     */
    return PlaylistIdentifier;

  }
})();
