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


    this.getJavaEpocMs = function () {
      return this.javaepoch_ms;
    }

    this.getJavaEpocS = function () {
      return this.javaepoch_ms / 1000;
    }

    this.getDate() = function(){
      return moment(this.javaepoch_ms).
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TimeStamp.build = function (date) {

      var ms = 0;

      if (date == null) {
        date = new Date();
      }

      if (date instanceof Date) {

        ms = moment(date).valueOf();

      } else {
        throw ("TimeStamp.buildFromDate expects a Date.");
      }

      return new TimeStamp(ms);

    }




    /**
     * Return the constructor function
     */
    return TimeStamp;
  };

})();
