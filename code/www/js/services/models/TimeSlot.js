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
    function TimeSlot(id, startAsDate, endAsDate) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.startAsDate = startAsDate;
      this.endAsDate = endAsDate;


      this.getId = function () {
        return this.id;
      }

      this.getStartAsDate = function () {
        return this.startAsDate;
      }

      this.getEndAsDate = function () {
        return this.endAsDate;
      }

      this.isDateWithinTimeSlot = function (date) {
        var result = false;
        var startTime = moment.parse(this.start_time).asHours();
        var endTime = moment.parse(this.end_time).asHours();

        if (candidate.isSameOrAfter(startTime)) {
          if (candidate.isSameOrBefore(endTime)) {
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

      return result;


    };




    /**
     * Return the constructor function
     */
    return TimeSlot;
  };


})();
