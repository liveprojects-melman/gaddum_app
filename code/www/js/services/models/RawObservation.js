(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('RawObservation', RawObservation)
    ;

  RawObservation.$inject = [

  ];
  function RawObservation(

  ) {

    function RawObservation(
      id,
      timestamp_ms,
      mood_id,
      timeslot,
      location_lat,
      location_lon,
      location_code,
      track_percent,
      num_repeats,
      mood_suitable,
      track,
      priority // value given as a measure of importance - derives from how the track was found in the DB.
    ) {
      this.id = id;
      this.timestamp_ms = timestamp_ms;
      this.mood_id = mood_id;
      this.timeslot = timeslot;
      this.location_lat = location_lat;
      this.location_lon = location_lon;
      this.location_code = location_code;
      this.track_percent = track_percent;
      this.num_repeats = num_repeats;
      this.mood_suitable = mood_suitable;
      this.track = track;
      this.priority = priority;


      this.getId = function () {
        return this.id;
      }
      this.getTimeStamp_ms = function () {
        return this.timestamp_ms;
      }
      this.getMoodId = function () {
        return this.mood_id;
      }
      this.getTimeSlotId = function () {
        return this.timeslot;
      }
      this.getLocationLat = function () {
        return this.location_lat;
      }
      this.getLocationLon = function () {
        return this.location_lon;
      }
      this.getPostcode = function () {
        return this.location_code;
      }
      this.getTrackPercent = function () {
        return this.track_percent;
      }
      this.getNumRepeats = function () {
        return this.num_repeats;
      }
      this.isMoodSuitable = function () {
        return this.mood_suitable;
      }
      this.getTrackId = function () {
        return this.track;
      }
      this.getPriority = function () {
        return this.priority;
      }
    }

    RawObservation.build = function (
      id,
      timestamp_ms,
      mood_id,
      timeslot,
      location_lat,
      location_lon,
      location_code,
      track_percent,
      num_repeats,
      mood_suitable,
      track,
      priority
    ) {

      return new RawObservation(
        id,
        timestamp_ms,
        mood_id,
        timeslot,
        location_lat,
        location_lon,
        location_code,
        track_percent,
        num_repeats,
        mood_suitable,
        track,
        priority
      );
    }


    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    RawObservation.buildFromObject = function (incoming) {
      var result = new RawObservation();

      result = angular.merge(result, incoming);

      return result;

    };




    /**
     * Return the constructor function
     */
    return RawObservation;

  }
})();
