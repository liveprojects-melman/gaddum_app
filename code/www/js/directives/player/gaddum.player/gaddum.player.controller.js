(function(){
  'use strict';

  angular
    .module('gaddum.player' )
    .controller('gaddumPlayerController', gaddumPlayerController);

  gaddumPlayerController.$inject = [
    'gaddumStreamingService',
    '$state',
    '$scope'
  ];

  function gaddumPlayerController(
    gaddumStreamingService,
    $state,
    $scope
  ) {
    var gpc = { };
    gpc.state = gaddumStreamingService.state;
    gpc.marquee = {
      "songtitle": gaddumStreamingService.song.title,
      "artistname": gaddumStreamingService.song.artist
    };
    gpc.scroll = gaddumStreamingService.state;
    gpc.toggle=function toggle(){
      console.log("TOGGLE!");
      gpc.state.ready = !gpc.state.ready;
    }
    return gpc;
  }
})();
