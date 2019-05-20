(function(){
  'use strict';

  angular.module('gaddum.playermenu', [ "gaddum.streaming" ])
    .controller('Controller', ['$scope', function($scope){
      //
    }])
    .directive('gaddum.playermenu', ['gaddum.streaming.service', function (stream){
      function link(scope, element,attrs) {
        scope.xyz="xyz";
      }

      return{
        restrict    : "E",
        templateUrl : function(elem, attrs) {
          return("js/modules/persistent/gaddum.playermenu/gaddum.playermenu.html");
        },
        link: link
      };
    }]);
})();
