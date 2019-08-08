(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('AvatarGraphic', AvatarGraphic)
    ;

  AvatarGraphic.$inject = [

  ];

  function checkHexColourValue(candidate) {

    var result = false;
    try {
      /* if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(candidate)) { */
      if (/#[0-9a-f]{6}?/i.test(candidate)) {
        result = true;
      }
    }
    catch (e) { }
    if (!result) {
      throw ("bad hex colour value: need a string: #rrbbgg");
    }

    return result;
  }

  function check8BitList(values) {
    var result = false;

    try {
      if (values && values.length == 8) {
        result = true;
        for (var i = 0; i < values.length; i++) {
          var value = values[i];
          if (!((value >= 0) && (value <= 255))) {
            result = false;
            break;
          }
        }
      }
    } catch (e) {
      result = false;
    }

    if (!result) {
      throw ("Bad 8 bit list. Need a list of integers:   0 <= int <= 255");
    }

    return result;
  }




  function AvatarGraphic(
  ) {
    function AvatarGraphic(
      colour,
      values
    ) {
      // Public properties, assigned to the instance ('this')
      this.colour = colour;
      this.values = values;

      this.getColour = function () {
        return this.colour;
      }
      this.getValues = function () {
        return this.values;
      }
      this.toBlob = function () {
        /* var v=[128, 128, 128, 130, 130, 130, 128, 128].join("z");
        var blobbed=btoa({"colour":this.colour,"values":v,"getColour":this.getColour,"getValues":this.getValues,"toBlob":this.toBlob});
        return blobbed; */

        return btoa(JSON.stringify(this));
      }

    }

    var build = function (colour, values) { // throws
      var result = null;


      checkHexColourValue(colour);
      check8BitList(values);

      result = new AvatarGraphic(
        colour,
        values
      );



      return result;

    };


    var buildDefault = function () {

      return build("#000000", [0, 0, 0, 0, 0, 0, 0, 0]);


    }

    var buildFromBlob = function (incoming) {
      var result = null;

      try {
        var candidate = JSON.parse(atob(incoming));
        var result = new AvatarGraphic();
        result = angular.merge(result, candidate);
        checkHexColourValue(result.getColour());
        /* result.getValues=result.getValues.split("z"); */
        check8BitList(result.getValues());


      } catch (e) {
        result = buildDefault();
      }
      return result;
    }


    /** 
     * Static methods, assigned to class
     * Instance ('this') is not available in static context
     */
    AvatarGraphic.checkHexColourValue = checkHexColourValue; // warning! throws
    AvatarGraphic.check8BitList = check8BitList; // warning! throws
    AvatarGraphic.build = build; // warning! throws
    AvatarGraphic.buildFromBlob = buildFromBlob; // warning! throws





    /**
     * Return the constructor function
     */
    return AvatarGraphic;
  }


})();
