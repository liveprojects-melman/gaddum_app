(function () {
  'use strict';

  console.log("Gaddum Player Controller");


  angular
    .module('gaddum.player')
    .controller('gaddumPlayerController', gaddumPlayerController);

  gaddumPlayerController.$inject = [
    '$q',
    '$state',
    '$scope',
    '$timeout',
    'playerService',
    'EventIdentifier',
    'TrackInfo',
    'GenericTrack'
  ];

  function gaddumPlayerController(
    $q,
    $state,
    $scope,
    $timeout,
    playerService,
    EventIdentifier,
    TrackInfo,
    GenericTrack
  ) {
    var gpc = {};
    gpc.state = {
      ready: true,
      show: true,
      hasTrack: true,
      busy: false
    };
    gpc.marquee = {
      "songtitle": "some song",
      "artistname": "some artist"
    };
    gpc.tryToUnderstandWhatIsHappening = setInterval(function(){
      console.log("gpc.state:",gpc.state);
    },2000);



    function onControlOK() {
      console.log("control OK.");
      // use this opportunity to put a busy spinner up, while we wait for an event
    }

    function onControlError(error) {
      console.log("control error. Track: " + error.message());
      gpc.state.playing = true;

    }

    function onTrackNew(trackInfo) {
      console.log("new track: " + trackInfo.getName());
      gpc.state.playing = true;
    }



    function onTrackPaused(trackInfo) {
      console.log("track paused: " + trackInfo.getName());
      gpc.state.playing = true;
    }

    function onTrackProgressPercent(progress) {
      console.log("track progress: " + progress);
    }

    function onTrackError(error) {
      console.log("track error: " + error);

    }

    function onLoggedIn(){
      console.log("logged in");

    }

    function onLoggedOut(){
      console.log("logged out");

    }

    function onInternetDown(){
      console.log("no internet");
    }

    function onInternetUp(){
      console.log("internet available");
    }

    function onPlaylistNew(){
      console.log("new playlist: controls disabled / spinner until we get track...");
    }

    function onPlaylistEnd(){
      console.log("end of playlist");
    }

    function onPlaylistNone(){
      console.log("no playlist");
    }

    function asyncHandleEvent(event) {


      var deferred = $q.defer();

      $timeout(
        function () {


          switch (event.getId()) {
            case EventIdentifier.TRACK_NEW: // a new track has been queued
              onTrackNew(event.getPayload());
              break;
            case EventIdentifier.TRACK_PAUSED:// the playing of the selected track has been paused
              onTrackPaused(event.getPayload());
              break;
            case EventIdentifier.TRACK_PROGRESS_PERCENT: // progress through selected track
              onTrackProgressPercent(event.getPayload());
              break;
            case EventIdentifier.TRACK_ERROR: // an error has occured playing the track / the track is not available.
              onTrackError(event.getPayload());
              break;
            case EventIdentifier.LOGGED_IN: // we are now logged in
              onLoggedIn();
              break;  
            case EventIdentifier.LOGGED_OUT: // we are now logged out
              onLoggedOut();
              break;
            case EventIdentifier.INTERNET_DOWN: // internet connection lost
              onInternetDown(event.getPayload());
              break;
            case EventIdentifier.INTERNET_UP: // internet connection found
              onInternetUp(event.getPayload());
              break;
            case EventIdentifier.PLAYLIST_NEW: // a new playlist is available
              onPlaylistNew();
              break;  
            case EventIdentifier.PLAYLIST_END: // no more tracks available in playlist.
              onPlaylistEnd();
              break;    
              case EventIdentifier.PLAYLIST_NONE: // no playlist has been loaded
              onPlaylistNone();
              break;    
    };

        });

      return deferred.promise;

    }

    gpc.handleBackPress = function handleBackPress() {
      playerService.asyncControlSkipPrev().then(function(){
        onControlOK();
        gpc.state.playing = true;
      },
        onControlError
      );
    };
    gpc.handlePausePress = function handlePausePress() {
      playerService.asyncControlPause().then(function(){
        onControlOK();
        gpc.state.playing = false;
      },
        onControlError
      );
    };
    gpc.handlePlayPress = function handlePlayPress() {
      playerService.asyncControlPlay().then(function(){
        onControlOK();
        gpc.state.playing = true;
      },
        onControlError
      );
    };
    gpc.handleNextPress = function handleNextPress() {
      playerService.asyncControlSkipNext().then(function(){
        onControlOK();
        gpc.state.playing = true;
      },
        onControlError
      );
    };


    function initialise() {
      playerService.initialise(asyncHandleEvent);
    }

    $scope.$on('player:ready',function(event,data) {
      console.log("gaddum.player - ready = ",data);
      gpc.show = data?true:false;
    });

    return gpc;
  }
})();
