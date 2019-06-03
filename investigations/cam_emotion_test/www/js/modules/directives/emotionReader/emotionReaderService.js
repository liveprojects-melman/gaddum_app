(function() {
  'use strict';

  angular
    .module('emotionReader', [])
    .factory('emotionReaderService', emotionReaderService);

  emotionReaderService.$inject = [];

  function emotionReaderService() {

    const nncPath = 'lib/external/js/jeeliz/jeelizFaceTransferNNC.json';

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
      if( emotionReaderService.isReady === false ) {
        jft.set_size(w,h);
        jft.set_audio( false );
        jft.onWebcamAsk = emotionReaderService._onWebcamAskCallback(e);
        jft.onWebcamGet = emotionReaderService._onWebcamGet(e);
        jft.onContextLost = emotionReaderService._onContentLost(e);

        angular.merge( videoSettings, {
          NNCPath: nncPath,
          callbackReady: service._callbackReady,
        });

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
      if( e === false ) {
        service.isReady = true;
        jft.on_detect = service.onDetect;
      } else {
        console.log("emotionReaderService._callbackReady - error starting, ",e);
      }
    };

    service.onDetect = function onDetect(detected) {
      service.face.detected = detected;
    };

    return service;

  }
})();
