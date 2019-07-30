(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('MoodIdentifier', MoodIdentifier)
    ;

  MoodIdentifier.$inject = [

  ];
  function MoodIdentifier(

  ) {
    function MoodIdentifier(id,name) {
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
    MoodIdentifier.build = function (id, name) {
      
        return new MoodIdentifier(
          id, name
        );
 

    };

    MoodIdentifier.buildFromObject = function (incoming) {
      var result = new MoodIdentifier();

      result = angular.merge(result, incoming);

      return result;

    };

    /**
     * Return the constructor function
     */
    return MoodIdentifier;

  }
})();
