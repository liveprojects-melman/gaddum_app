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
        function settingIdentifier(id, friendly_name, type,default_value) {
            // Public properties, assigned to the instance ('this')
            this.id = id;
            this.friendly_name = friendly_name;
            this.type = type;
            this.default_value = default_value;
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
         function getDefault_value(){
           return this.defaultValue;
         }
          
          /**
           * Static method, assigned to class
           * Instance ('this') is not available in static context
           */
          settingIdentifier.build = function (id, friendly_name,type,default_value) {
            if (validTypes[type]){
              return new settingIdentifier(
              id,
              friendly_name,
              type,
              default_value
              
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
  