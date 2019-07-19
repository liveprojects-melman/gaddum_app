(function () {
    'use strict;'
  
    angular
      .module('gaddum.models',[])
      .factory('settingIdentifier', settingIdentifier)
      ;
  
      settingIdentifier.$inject = [
      
    ];
    function settingIdentifier(
        
    ) {
        function settingIdentifier(id, friendly_name, type,defaultValue) {
            // Public properties, assigned to the instance ('this')
            this.id = id;
            this.friendly_name = friendly_name;
            this.type = type;
            this.defaultValue = defaultValue;
          }
         var validTypes={"string":true,"boolean":true}; 
         function getid(){
           return this.id;
         }
         function getFriendlyName(){
           return this.friendly_name;
         }
         function getType(){
           return this.type;
         }
         function getDefaultValue(){
           return this.defaultValue;
         }
          
          /**
           * Static method, assigned to class
           * Instance ('this') is not available in static context
           */
          settingIdentifier.build = function (id, friendly_name,type,defaultValue) {
            if (validTypes[type]){
              return new settingIdentifier(
              id,
              friendly_name,
              type,
              defaultValue
              
            );
            }else{
              console.log("not valid type");
            }
            
          };
         
          /**
           * Return the constructor function
           */
          return settingIdentifier;
    }
  })();
  