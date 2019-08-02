(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('TrackSearchCriteria', TrackSearchCriteria)
    ;

  TrackSearchCriteria.$inject = [
    'SearchModifier'
  ];
  function TrackSearchCriteria(
    SearchModifier
  ) {
    function TrackSearchCriteria(term, searchModifiers) {
      // Public properties, assigned to the instance ('this')
      this.term = term;
      this.searchModifiers = searchModifiers;

      this.getTerm = function () {
        return this.term;
      }

      this.getSearchModifiers = function () {
        return this.searchModifiers;
      }

    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    TrackSearchCriteria.build = function (term, searchModifiers) {

      return new TrackSearchCriteria(
        term, searchModifiers
      );


    };

    /**
     * Return the constructor function
     */
    return TrackSearchCriteria;

  }
})();
