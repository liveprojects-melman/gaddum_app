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
    return gpc;
  }
})();
