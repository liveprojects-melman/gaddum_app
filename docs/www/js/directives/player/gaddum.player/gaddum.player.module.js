(function(){
  'use strict';

  angular.module('gaddum.player', [ "angular-marquee" ] )
    .directive('gaddum.player',function(){

      return{
        restrict    : "E",
        templateUrl : function() {
          return("js/directives/player/gaddum.player/gaddum.player.html");
        },
        //link:link,
        scope: true,
        bindToController: {
          playerState: "@",
          marquee: "@"
        },
        controller: 'gaddumPlayerController',
        controllerAs: 'gpc'
      };
    });
})();
