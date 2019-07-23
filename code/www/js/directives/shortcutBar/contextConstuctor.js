(function () {
    'use strict;'
  
    angular
      .module('gaddum.shortcutBar')
      .factory('gaddum.contextMenuItem', MenuItem)
      ;
  
      MenuItem.$inject = [
      
    ];
    function MenuItem(
        
    ) {
        function MenuItem(name, func) {
            // Public properties, assigned to the instance ('this')
            this.name = name;
            this.func = func;
          }
         
          
          /**
           * Static method, assigned to class
           * Instance ('this') is not available in static context
           */
          MenuItem.build = function (name,func) {
            
            return new MenuItem(
              name,
              func
              
            );
          };
         
          /**
           * Return the constructor function
           */
          return MenuItem;
    }
  })();
  