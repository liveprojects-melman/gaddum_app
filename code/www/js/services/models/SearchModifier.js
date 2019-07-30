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

    function getName(){
      return name;
    }

    function getId(){
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
