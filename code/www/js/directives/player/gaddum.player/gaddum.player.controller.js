(function () {
  'use strict';

  angular
    .module('gaddum.player')
    .controller('gaddumPlayerController', gaddumPlayerController);

  gaddumPlayerController.$inject = [
    '$state',
    '$scope',
    'playerService',
    'EventIdentifier',
    'TrackInfo',
    'GenericTrack'
  ];

  function gaddumPlayerController(

    $state,
    $scope,
    playerService,
    EventIdentifier,
    TrackInfo,
    GenericTrack
  ) {
    var gpc = {};
    gpc.state = {
      ready: true,
      hasTrack: true
    };
    gpc.marquee = {
      "songtitle": "some song",
      "artistname": "some artist"
    };


    function onControlOK(genericTrack) {
      console.log("control OK. Generic Track being passed to Music Provider: " + genericTrack.getname());
    }

    function onControlError(error) {
      console.log("control error. Track: " + error.message());
    }

    function onTrackStart(trackInfo) {
      console.log("track playing: " + trackInfo.getName());
    }

    function onTrackEnd(trackInfo) {
      console.log("track ended: " + trackInfo.getName());
    }

    function onTrackPaused(trackInfo) {
      console.log("track paused: " + trackInfo.getName());
    }

    function onTrackProgressPercent(progress) {
      console.log("track progress: " + progress);
    }

    function onTrackError(error) {
      console.log("track error: " + error.getMessage());
      var deferred = $q.defer();

      $timeout(
        function () {
          deferred.resolve();
        }
      )

      return deferred.promise;

    }


    function asyncHandleEvent(event) {


      var deferred = $q.defer();

      $timeout(
        function () {


          switch (event.getCode()) {
            case EventIdentifier.TRACK_START: // the current track has started / resumed playing
              onTrackStart(event.getMessage());
              break;
            case EventIdentifier.TRACK_END:// the current track has completed playing
              onTrackEnd(event.getMessage());
              break;
            case EventIdentifier.TRACK_PAUSED:// the playing of the selected track has been paused
              onTrackPaused(event.getMessage());
              break;
            case EventIdentifier.TRACK_PROGRESS_PERCENT: // progress through selected track
              onTrackProgressPercent(event.getMessage());
              break;
            case EventIdentifier.TRACK_ERROR: // an error has occured playing the track / the track is not available.
              onTrackError(event.getMessage());
              break;

          };

        });

      return deferred.promise;

    }

    gpc.handleBackPress = function handleBackPress() {
      playerService.asyncControlSkipPrev().then(
        onControlOK,
        onControlError
      );
    };
    gpc.handlePausePress = function handlePausePress() {
      playerService.asyncControlPause().then(
        onControlOK,
        onControlError
      );
    };
    gpc.handlePlayPress = function handlePlayPress() {
      playerService.asyncControlPlay().then(
        onControlOK,
        onControlError
      );
    };
    gpc.handleNextPress = function handleNextPress() {
      playerService.asyncControlSkipNext().then(
        onControlOK,
        onControlError
      );
    };
    //TODO: Need controls for playing again from the begining of the track 

    function initialise() {
      playerService.initialise(asyncHandleEvent);
    }

    initialise();

    return gpc;
  }
})();
