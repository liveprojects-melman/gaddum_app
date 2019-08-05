(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('Observation', Observation)
    ;

  Observation.$inject = [

  ];
  function Observation(

  ) {

    function Observation() {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.timestamp_s = timestamp_s;
      this.mood_id = mood_id;
      this.timeslot = timeslot;
      this.lat = lat;
      this.lon = lon;
      this.postcode = postcode;
      this.num_repeats = num_repeats;
      this.mood_suitable = mood_suitable;
      this.track = track;
    }

    function getId() {
      return this.id;
    }
    function getTimestamp_s() {
      return this.message;
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Observation.buildFromObject = function (incoming) {
      var result = new Observation();

      result = angular.merge(result, incoming);




      return result;

    };

    


    /**
     * Return the constructor function
     */
    return Observation;

  }
})();
