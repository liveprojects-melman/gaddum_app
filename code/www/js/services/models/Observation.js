(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('Observation', Observation)
    ;

  Observation.$inject = [
    'TimeStamp',
    'MoodIdentifer',
    'Location',
    'Postcode',
    'GenericTrack'
  ];
  function Observation(
    TimeStamp,
    MoodIdentifer,
    Location,
    Postcode,
    GenericTrack
  ) {

    function Observation(id,timeStamp,mood, timeSlot, location, postcode, trackPercent, numRepeats, moodSuitable, genericTrack) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.timeStamp = timeStamp;
      this.mood = mood;
      this.timeSlot = timeSlot;
      this.location = location;
      this.postcode = postcode;
      this.trackPercent = trackPercent;
      this.numRepeats = numRepeats;
      this.moodSuitable = moodSuitable;
      this.genericTrack = genericTrack;
    }

    this.getId = function() {
      return this.id;
    }
    this.getTimeStamp = function(){
      return this.timeStamp;
    }
    this.getMood = function(){
      return this.mood;
    }
    this.getTimeSlot = function(){
      return this.timeSlot;
    }
    this.getLocation = function(){
      return this.location;
    }
    this.getPostcode = function(){
      return this.postcode;
    }
    this.getTrackPercent = function(){
      return this.trackPercent;
    }
    this.getNumRepeats = function(){
      return this.numRepeats;
    }
    this.isMoodSuitable = function(){
      return this.moodSuitable;
    }
    this.getTrack = function(){
      return this.genericTrack;
    }


    Observation.build = function (id,timeStamp,mood, timeSlot, location, postcode, trackPercent,numRepeats, moodSuitable, genericTrack){
      return new Observation(id,timeStamp,mood, timeSlot, location, postcode, trackPercent, numRepeats, moodSuitable, genericTrack);

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
