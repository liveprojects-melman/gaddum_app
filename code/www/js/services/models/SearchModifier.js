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

    this.getName = function(){
      return name;
    }

    this.getId = function(){
      return id;
    }




    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    SearchModifier.build = function (id, name) {

      return new SearchModifier(id, name);
    };




    return SearchModifier;
  };


  /**
   * Return the constructor function
   */
  


}) ();
