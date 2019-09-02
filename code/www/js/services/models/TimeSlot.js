(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('TimeSlot', TimeSlot);

  TimeSlot.$inject = [
    'moment'
  ];

  function TimeSlot(
    moment
  ) {
    function TimeSlot() {

      this.id = null;
      this.start_time = null;
      this.end_time = null;
      this.startParsed = null; // parsed as moment on creation
      this.endParsed = null;

      this.getId = function () {
        return this.id;
      }

      this.getStartTime = function(){
        return this.startParsed.toDate();
      }

      this.getEndTime = function(){
        return this.endParsed.toDate();
      }


      this.isDateWithinTimeSlot = function (date) {
        var result = false;
        var candidate = moment(date,'HH:mm');


        if (candidate.isSameOrAfter(this.startParsed)) {
          if (candidate.isSameOrBefore(this.endParsed)) {
            result = true;
          }
        }

        return result;

      }

    }

    


    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TimeSlot.buildFromObject = function (candidate) {

      var result = new TimeSlot();

      result = angular.merge(result, candidate);

      result.startParsed = moment(result.start_time, 'HH:mm');
      result.endParsed = moment(result.end_time, 'HH:mm');





      return result;


    };




    /**
     * Return the constructor function
     */
    return TimeSlot;
  };


})();
