(function(){
  'use strict';

  angular
    .module('gaddum.streaming')
    .factory('gaddumStreamingService', gaddumStreamingService);

  gaddumStreamingService.$inject = [
    '$http',
    '$rootScope',
    'gaddumMusicProviderService',
//    'intelligentTrackSelector',
    '$interval' // testing only
  ];
  function gaddumStreamingService(
    $http,
    $rootScope,
    gaddumMusicProviderService,
//    intelligentTrackSelector,
    $interval
  ) {
    var service = {
      state: {
        ready: false,
        playing: false
      },
      song: {
        title: "",
        artist: ""
      }
    };

    ///

    service.handlePause = function handlePause() {
      gaddumMusicProviderService.asyncPauseCurrentTrack().then(
        function(okay){console.log("handlePause - got ",okay)},
        function(err) {console.log("handlePause - ERROR ",err)}
      );
    };

    service.handlePlay = function handlePlay() {
      gaddumMusicProviderService.asyncPlayCurrentTrack().then(
        function(okay){ console.log("handlePlay - got ",okay) },
        function(err) { console.log("handlePlay - ERROR ",err) }
      );
    };

    service.handleBackPress = function handleBackPress() {
      intelligentTrackSelector.asyncPrev().then(
        function(okay){ console.log("handlePrev - got ",okay) },
        function(err) { console.log("handlePrev - ERROR ",err) }
      );
    };

    service.handlePrev = function handleNextPress() {
      intelligentTrackSelector.asyncNext().then(
        function(okay){ console.log("handleNext - got ",okay) },
        function(err) { console.log("handleNext - ERROR ",err) }
      );
    };

    ///

    service.init = function init() {
      service.state.ready = true;
      service.state.playing = false;
    };

    service.init();

    /*
    // set up a thing to toggle interface from time to time! (testing)
    service.test = $interval(function(){
      service.state.playing = !service.state.playing;
      console.log("PLAYTOGGLE");
    },3000,50, true ); 
    service.test2 = $interval(function(){
      //service.state.ready = !service.state.ready;
      $rootScope.$broadcast('player:ready',service.state.ready);
      console.log("READYTOGGLE");
    },5000,50, true );*/
/*    */
    return service;

  }

})();
