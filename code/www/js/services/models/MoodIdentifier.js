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
    function MoodIdentifier(id,name, id_anti) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.name = name;
      this.id_anti = id_anti
    

    this.getName =function(){
      return this.name;
    }

    this.getId = function(){
      return this.id;
    }

    this.getIdAnti = function(){
      return this.id_anti;
    }

  }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    MoodIdentifier.build = function (id, name, id_anti) {
      
        return new MoodIdentifier(
          id, name, id_anti
        );
 

    };

    MoodIdentifier.buildFromObject = function (incoming) {
      var result = new MoodIdentifier();

      result = angular.merge(result, incoming);


      if(result.id == result.mood_hot){
        result.id_anti = result.mood_cool;
      }else{
        result.id_anti = result.mood_hot;
      }

      return result;

    };

    /**
     * Return the constructor function
     */
    return MoodIdentifier;

  }
})();
