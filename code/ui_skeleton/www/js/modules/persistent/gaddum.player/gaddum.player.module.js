(function(){
  'use strict';

  angular.module('gaddum.player', [ gaddum.streaming ])
    .controller('Controller', ['$scope', function($scope){
      $scope.stream = stream;
    }])
    .directive('gaddum.player', ['gaddum.streaming.service', function( stream ){
      function link(scope,element,attrs) {
//        scope.stream = stream; // hook in the streaming service 
      }

    return{
      restrict    : "E",
      templateUrl : function(elem, attr) {
        return("js/modules/persistent/gaddum.player/gaddum.player.html");
      },
      link:link
    };
  }]);
})();
