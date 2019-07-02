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
    this.state = gaddumStreamingService.state;
    this.marquee = {
      "songtitle": gaddumStreamingService.song.songTitle,
      "artistname": gaddumStreamingService.song.artistName
    };
  };
})();
