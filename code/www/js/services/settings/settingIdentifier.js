(function () {
  'use strict';

  angular
    .module('gaddum.settings')
    .factory('settingIdentifier', settingIdentifier)
    ;

  settingIdentifier.$inject = [

  ];
  function settingIdentifier(

  ) {
    function settingIdentifier(id, friendly_name, friendly_description, value_type, default_value) {
      // Public properties, assigned to the instance ('this')
      this.id = id;
      this.friendly_name = friendly_name;
      this.friendly_description = friendly_description;
      this.value_type = value_type;
      this.default_value = default_value;
    }
    var validTypes = { "string": true, "boolean": true };
    function getid() {
      return this.id;
    }
    function getFriendlyName() {
      return this.friendly_name;
    }
    function getFriendlyDescription() {
      return this.friendly_description;
    }
    function getType() {
      return this.value_type;
    }
    function getDefault_value() {
      return this.defaultValue;
    }

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    settingIdentifier.build = function (id, friendly_name, friendly_description, value_type, default_value) {
      if (validTypes[value_type]) {
        return new settingIdentifier(
          id,
          friendly_name,
          friendly_description,
          value_type,
          default_value

        );
      } else {
        console.log("not valid value_type");
      }

    };

    settingIdentifier.buildMinimal = function (id,value_type) {

      return new settingIdentifier(
        id,
        null,
        null,
        value_type,
        null
      );
    }

    settingIdentifier.buildFromObject = function (incoming) {
      var result = new settingIdentifier();

      result = angular.merge(result, incoming);

      return result;

    };



    /**
     * Return the constructor function
     */
    return settingIdentifier;

  }
})();
