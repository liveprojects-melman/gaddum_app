(function(){
  'use strict';

  angular.module('gaddum.playermenu', [ "gaddum.streaming" ])

    .directive('gaddum.playermenu', function (){
//      function link(scope, element,attrs) {
//        scope.xyz="xyz";
//      }

      return{
        restrict    : "E",
        templateUrl : function(elem, attrs) {
          return("js/directives/player/gaddum.playermenu/gaddum.playermenu.html");
        },
//        link: link,
                bindToController: true,
        controller: 'gaddumPlayerMenuController',
        controllerAs: 'gpmc'
      };
    });
})();
