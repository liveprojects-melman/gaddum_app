(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('AvatarGraphic', AvatarGraphic)
    ;

  AvatarGraphic.$inject = [

  ];
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
        return atob(JSON.stringify(this));
      }
    }

    function isHexColourValue(candidate) {
      var result = false;
      if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(candidate)) {
        result = true;
      }
      return result;
    }

    function is8BitList(values) {
      var result = false;

      if (values && values.length == 8) {
        result = true;
        for (var i = 0; i < values.length; i++) {
          var value = values[i];
          if (!((value >= 0) && (value <= 255))){
            result = false;
            break;
          }
        }
      }
      return result;
    }
  }


  AvatarGraphic.isHexColourValue(candidate) = isHexColourValue;
  AvatarGraphic.is8BitList(candidate) = is8BitList;


  /** 
   * Static method, assigned to class
   * Instance ('this') is not available in static context
   */
  AvatarGraphic.build = function (colour, values) {
    var result = null;

    if (typeof colour == 'string' && typeof (values) == 'array') {
      if (isHexColourValues(colour) && is8BitList(values)){
        result = new AvatarGraphic(
          colour,
          values
        );
      }else{
        throw ("AvatarGraphic: bad parameters: colour: hex string, values: array of 8 * (0 > int < 255)");
      }
    }

    return result;

  };


  AvatarGraphic.buildFromBlob = function(incoming){
      var candidate = JSON.parse(btoa(incoming));
      var result = new AvatarGraphic();
      result = angular.merge(result, candidate);
      return result;
  }

  /**
   * Return the constructor function
   */
  return AvatarGraphic;


}) ();
