(function () {
    'use strict;'
  
    angular
      .module('gaddum.shortcutBar')
      .factory('gaddumContextMenuItem', gaddumContextMenuItem)
      ;
  
      gaddumContextMenuItem.$inject = [
      
    ];
    function gaddumContextMenuItem(
        
    ) {
        function gaddumContextMenuItem(name, func) {
            // Public properties, assigned to the instance ('this')
            this.name = name;
            this.func = func;
          }
         
          
          /**
           * Static method, assigned to class
           * Instance ('this') is not available in static context
           */
          gaddumContextMenuItem.build = function (name,func) {
            
            return new gaddumContextMenuItem(
              name,
              func
              
            );
          };
         
          /**
           * Return the constructor function
           */
          return gaddumContextMenuItem;
    }
  })();
  