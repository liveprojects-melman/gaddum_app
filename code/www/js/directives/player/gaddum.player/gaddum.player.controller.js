(function(){
  'use strict';

  angular
    .module('gaddum.player' )
    .controller('gaddumPlayerController', gaddumPlayerController);

  gaddumPlayerController.$inject = [
    'gaddumStreamingService',
    'intelligentTrackSelector',
    '$state',
    '$scope'
  ];

  function gaddumPlayerController(
    gaddumStreamingService,
    intelligentTrackSelector,
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

    gpc.handleBackPress = function handleBackPress() {
      gaddumStreamingService.handleBack();
    };
    gpc.handlePausePress = function handlePausePress(){
      gaddumStreamingService.handlePause();
    };
    gpc.handlePlayPress = function handlePlayPress(){
      gaddumStreamingService.handlePlay();
    };
    gpc.handleNextPress = function handleNextPress(){
      gaddumStreamingService.handleNext();
    };

    return gpc;
  }
})();
