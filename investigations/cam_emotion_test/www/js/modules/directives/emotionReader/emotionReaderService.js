(function() {
  'use strict';

  angular
    .module('emotionReader', [])
    .factory('emotionReaderService', emotionReaderService);

  emotionReaderService.$inject = ['$rootScope'];

  function emotionReaderService($rootScope) {

    var nncPath = 'lib/external/js/jeeliz/';

    var service = {};

    service.EMOTIONS = {
      "0": {
        name:"HAPPY",
        emoji: "😀"
      },
      "1": {
        name: "SAD",
        emoji:"😭"
      }
    };
    service.face = {
      detected: false
    };

    service.isReady = false;
    service.isRunning = false;
    service.isSleeping = false;

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

    service._onWebcamAskCallback = function _onWebcamAskCallback(e) {
      console.log("onWebcamAskCallback - ",e);
    };
    service._onWebcamGetCallback = function _onWebcamGetCallback(e) {
      console.log("onWebcamGetCallback - ",e);
    };
    service._onContextLostCallback = function _onContentLostCallback(e) {
      console.log("onContentLostCallback - ",e);
    };

    service._callbackReady = function _callbackReady(e) {
      console.log("emotionReaderService - callbackReady - ",e);
      if( ( e === false ) || ( e === undefined) ) {
        console.log("WE ARE OFF");
        service.isReady = true;
        jft.on_detect(service.onDetect);
      } else {
        console.log("emotionReaderService._callbackReady - error starting, ",e);
      }
    };

    service.onDetect = function onDetect(detected) {
      var olddetected = service.face.detected;
      service.face.detected = detected;
      $rootScope.$apply('detected===olddetected');
    };

    return service;

  }
})();
