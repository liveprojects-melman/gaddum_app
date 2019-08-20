(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('Postcode', Postcode);

  Postcode.$inject = [

  ];

  function Postcode(
  ) {
    function Postcode(postcode) {
      // Public properties, assigned to the instance ('this')
      this.postcode = postcode;

      this.getPostcode = function () {
        return postcode;
      }

    }

    var POSTCODE_VALIDATION_REGEX = "^(GIR 0AA)|((([A-Z-[QVX]][0-9][0-9]?)|(([A-Z-[QVX]][A-Z-[IJZ]][0-9][0-9]?)|(([A-Z-[QVX]][0-9][A-HJKSTUW])|([A-Z-[QVX]][A-Z-[IJZ]][0-9][ABEHMNPRVWXY]))))\s?[0-9][A-Z-[CIKMOV]]{2})$";

    function validate(postcode) {
      return POSTCODE_VALIDATION_REGEX.test(postcode);
    }


    Postcode.validate = validate;

    Postcode.build = function (postcode) {
      if (!Postcode.validate(postcode)) {
        throw ("not a valid postcode");
      } else {
        return new Postcode(postcode);
      }
    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Postcode.buildFromObject = function (incoming) {

      var result = new Postcode();

      result = angular.merge(result, incoming);

      return result;
    };




    /**
     * Return the constructor function
     */
    return Postcode;
  }



})();
