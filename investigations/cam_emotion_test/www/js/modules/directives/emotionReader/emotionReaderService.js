(function() {
  'use strict';

  angular
    .module('emotionReader', [])
    .factory('emotionReaderService', emotionReaderService);

  emotionReaderService.$inject = ['$rootScope', '$interval' ];

  function emotionReaderService( $rootScope, $interval ) {

    var nncPath = 'lib/external/js/jeeliz/';

    var service = {};

    service.face = {
      detected: false
    };

    service.isReady = false;
    service.isRunning = false;
    service.isSleeping = false;
    service.cameraError = false;

    service.recognitionInterval = undefined;
    service.recognitionIntervalMS = 1000; // MS between recognition attempts

    service.recognisedState = "-";

    var jft = JEEFACETRANSFERAPI;

    service.initialise = function initialise(w,h,videoSettings) {
      console.log("initialising!", service.isReady);
      if( service.isReady === false ) {
        jft.set_size( w,h );
        jft.set_audio( false );
        jft.onWebcamAsk = service._onWebcamAskCallback;
        jft.onWebcamGet = service._onWebcamGet;
        jft.onContextLost = service._onContentLost;

        angular.merge( videoSettings, {
          NNCpath: nncPath,
          callbackReady: service._callbackReady,
        });

        console.log("starting jft with these video params",videoSettings);

        jft.init( videoSettings );
      }
    };

    service.setSleep = function setSleep(newState) {
      jft.switch_sleep(Boolean(newState));
      service.isRunning = Boolean(newState);
      $rootScope.$apply('true===false');
    };

    service._onWebcamAskCallback = function _onWebcamAskCallback(e) {
      console.log("onWebcamAskCallback - ",e);
      $rootScope.$apply('true');
    };
    service._onWebcamGetCallback = function _onWebcamGetCallback(e) {
      console.log("onWebcamGetCallback - ",e);
      $rootScope.$apply('true');
    };
    service._onContextLostCallback = function _onContentLostCallback(e) {
      console.log("onContentLostCallback - ",e);
      $rootScope.$apply('true');
    };

    service._callbackReady = function _callbackReady(e) {
      service.isReady = true;
      service.isRunning = true;
      if( ( e === false ) || ( e === undefined) ) {
        service.isRunning = true;
        jft.on_detect(service.onDetect);
      } else {
        console.log("emotionReaderService._callbackReady - error starting, ",e);
        service.isRunning = service.isReady = false;
        service.cameraError = true;
      }
      $rootScope.$apply('true===false');
    };

    service.startRecogniserInterval = function startRecogniserInterval() {
      if( angular.isDefined( service.recognitionInterval ) ) {
        service.stopRecogniserInterval();
      }
      service.recognitionInterval = $interval( service.doRecognition, service.recognitionIntervalMS );
    };

    service.stopRecogniserInterval = function stopRecogniserInterval() {
      $interval.cancel( service.recognitionInterval );
      service.recognitionInterval = undefined;
    };

    service.doRecognition = function doRecognition() {
      return;
      console.log( "get_nMorphs: ",jft.get_nMorphs() );
      console.log( "get_morphTargetInfluencesStabilized: ", jft.get_morphTargetInfluencesStabilized() );
    };

    service.onDetect = function onDetect(detected) {
      var olddetected = service.face.detected;
      service.face.detected = detected;
      $rootScope.$apply('detected===olddetected');

      if(detected===true) {
        service.startRecogniserInterval();
//        jft.get_morphUpdateCallback
      } else {
        service.stopRecogniserInterval();
      }
    };

    return service;

  }
})();
