(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('SearchModifier', SearchModifier)
    ;

  SearchModifier.$inject = [

  ];
  function SearchModifier(

  ) {

   
    function SearchModifier(id, name) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.name = name;
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    SearchModifier.build = function (id, name) {

      return new SearchModifier(id, name);
    };

    SearchModifier.buildFromObject = function(incoming){

        var result = new SearchModifier();
  
        result = angular.merge(result, incoming);
  
        return result;
  
    };



  };


  /**
   * Return the constructor function
   */
  return SearchModifier;


}) ();
