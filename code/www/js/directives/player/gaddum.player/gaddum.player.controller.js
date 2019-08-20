(function(){
  'use strict';

  angular
    .module('gaddum.player' )
    .controller('gaddumPlayerController', gaddumPlayerController);

  gaddumPlayerController.$inject = [
    'gaddumStreamingService',
    'playerService',
    '$state',
    '$scope'
  ];

  function gaddumPlayerController(
    gaddumStreamingService,
    playerService,
    $state,
    $scope
  ) {
    var gpc = { };
    gpc.show = false;
    gpc.marquee = {
      "songtitle": gaddumStreamingService.song.title,
      "artistname": gaddumStreamingService.song.artist
    };
    gpc.toggle=function toggle(){
      console.log("TOGGLE!");
      gpc.state.ready = !gpc.state.ready;
    };

    gpc.handleBackPress = function handleBackPress() {
      //gaddumStreamingService.handleBack();
      playerService.asyncControlSkipBack.then(
        function(ok){console.log(ok);},
        function(er){console.log(er);}
      );
    };
    gpc.handlePausePress = function handlePausePress(){
      //gaddumStreamingService.handlePause();
      playerService.asyncControlControlPause.then(
        function(ok){console.log(ok);},
        function(er){console.log(er);}
      );
    };
    gpc.handlePlayPress = function handlePlayPress(){
      //gaddumStreamingService.handlePlay();
      playerService.asyncControlPlay.then(
        function(ok){console.log(ok);},
        function(er){console.log(er);}
      );
    };
    gpc.handleNextPress = function handleNextPress(){
      //gaddumStreamingService.handleNext();
      playerService.asyncControlSkipNext.then(
        function(ok){console.log(ok);},
        function(er){console.log(er);}
      );

    };

    $scope.$on('player:ready',function(event,data) {
      console.log("gaddum.player - ready = ",data);
      gpc.show = data?true:false;
    });

    return gpc;
  }
})();
