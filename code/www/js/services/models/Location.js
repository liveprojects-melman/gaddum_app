(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('Location', Location);

  Location.$inject = [
  ];
  function Location(
  ) {
    function Location(lat, lon) {
      // Public properties, assigned to the instance ('this')
      this.lat = lat;
      this.lon = lon;

    

    this.getLat = function(){
      return this.lat;
    }

    this.getLon =function(){
      return this.lon;
    }


  }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Location.build = function (lat,lon) {
      return new Location(lat, lon);
    };

    Location.buildEmpty = function(){
      return new Location(null, null, null);
    }
  };


  /**
   * Return the constructor function
   */
  return Location;


}) ();
