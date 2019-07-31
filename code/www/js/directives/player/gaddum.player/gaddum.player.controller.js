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
    gpc.toggle=function toggle(){
      console.log("TOGGLE!");
      gpc.state.ready = !gpc.state.ready;
    };

    gpc.handleBackPress = function handleBackPress(){};
    gpc.handlePausePress = function handlePausePress(){};
    gpc.handlePlayPress = function handlePlayPress(){};
    gpc.handleNextPress = function handleNextPress(){};

    return gpc;
  }
})();
