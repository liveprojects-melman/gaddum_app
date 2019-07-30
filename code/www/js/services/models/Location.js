(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('Location', Location)
    ;

  Location.$inject = [
  ];
  function Location(
  ) {
    function Location(lat, lon) {
      // Public properties, assigned to the instance ('this')
      
      this.lat = lat;
      this.lon = lon;  

    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Location.build = function (lat,lon) {

      return new Location(lat, lon);
    };

  };


  /**
   * Return the constructor function
   */
  return Location;


}) ();
