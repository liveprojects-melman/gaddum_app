(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('TimeStamp', TimeStamp)
    ;

  TimeStamp.$inject = [
    'moment'
  ];
  function TimeStamp(
    moment
  ) {
    function TimeStamp(javaepoch_ms) {
      // Public properties, assigned to the instance ('this')
      this.javaepoch_ms = javaepoch_ms;
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TimeStamp.buildFromDate = function (date) {

      var ms = 0;

      if (date instanceof Date) {

        ms = moment(date).valueOf();

      } else {
        throw ("TimeStamp.buildFromDate expects a Date.");
      }

      return new TimeStamp(ms);
    };

  };


  /**
   * Return the constructor function
   */
  return TimeStamp;


}) ();
