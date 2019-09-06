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

    // see orgiginal source:
    // https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/488478/Bulk_Data_Transfer_-_additional_validation_valid_from_12_November_2015.pdf
    var POSTCODE_VALIDATION_REGEX = RegExp("^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$");

    function validate(postcode) {

      var result =  POSTCODE_VALIDATION_REGEX.test(postcode);
      return result;
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
