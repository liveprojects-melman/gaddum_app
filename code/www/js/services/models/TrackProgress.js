(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('TrackProgress', TrackProgress);

  TrackProgress.$inject = [

  ];

  function TrackProgress(

  ) {
    function TrackProgress(progressPercent, progressWarning) {

      this.progressPercent = progressPercent;
      this.progressWarning = progressWarning;

      this.getProgressPercent = function () {
        return this.progressPercent;
      }

      this.getProgressWarning = function(){
        return this.progressWarning;
      }

      this.isWarning = function(){
        return this.progressPercent < this.progressWarning;
      }

    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TrackProgress.build = function (progressPercent, progressWarning) {

      var result = new TrackProgress(progressPercent, progressWarning);



      return result;


    };




    /**
     * Return the constructor function
     */
    return TrackProgress;
  };


})();
