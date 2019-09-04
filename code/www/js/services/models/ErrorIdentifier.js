(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('ErrorIdentifier', ErrorIdentifier)
    ;

  ErrorIdentifier.$inject = [

  ];
  function ErrorIdentifier(

  ) {

    ErrorIdentifier.SYSTEM = -1; // programing error which needs warning about!
    ErrorIdentifier.DATABASE = -2; // an error occured in the database
    ErrorIdentifier.NO_MUSIC_PROVIDER = -3; //  there is no link to any music provider, or the current music provider is not logged in. 


    function ErrorIdentifier(code, message) {
      // Public properties, assigned to the instance ('this')
      this.code = code;
      this.message = message;



      this.getCode = function () {
        return this.code;
      }
      this.getMessage = function () {
        return this.message;
      }
    }


    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    ErrorIdentifier.build = function (code, message) {

      return new ErrorIdentifier(
        code, message
      );

    };




    /**
     * Return the constructor function
     */
    return ErrorIdentifier;

  }
})();
