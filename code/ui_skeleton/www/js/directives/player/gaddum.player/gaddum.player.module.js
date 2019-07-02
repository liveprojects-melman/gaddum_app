(function(){
  'use strict';

  angular.module('gaddum.player', [ "gaddum.streaming", "angular-marquee" ] )
    .directive('gaddum.player',function(){
      return{
        restrict    : "E",
        templateUrl : function() {
          return("js/directives/player/gaddum.player/gaddum.player.html");
        },
        scope: true,
        bindToController: {
          state: '@',
          marquee: '@'
        },
        controller: 'gaddumPlayerController',
        controllerAs: 'gpc'
      };
    });
})();
