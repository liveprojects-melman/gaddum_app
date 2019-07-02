(function(){
  'use strict';

  angular.module('gaddum.player', [ "gaddum.streaming", "angular-marquee" ])
    .controller('Controller', ['$scope', function($scope){
      $scope.stream = stream;
    }])
    .directive('gaddum.player', ['gaddum.streaming.service', function( stream ){
      function link(scope,element,attrs) {
        scope.playerState = stream.state;
        scope.marquee={
        };
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
