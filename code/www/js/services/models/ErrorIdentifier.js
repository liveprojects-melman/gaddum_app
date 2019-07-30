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
    function ErrorIdentifier(code,message) {
      // Public properties, assigned to the instance ('this')
      this.code = code;
      this. message = message;

    }

    function getCode() {
      return this.code;
    }
    function getMessage() {
      return this.message;
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
