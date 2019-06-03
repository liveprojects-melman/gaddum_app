(function(){
  'use strict';

  angular
    .module('emotionReader', [])
    .directive('emotionReaderFeedback', emotionReaderFeedback)
    .directive('emotionReaderCameraMarker', emotionReaderCameraMarker)
    .directive('emotionReaderResultFeedback', emotionReaderResultMenu);

  function emotionReaderFeedback(emotionReaderService) {
    return{
      restrict: 'A',
      scope: true,
      compile: function(tElement, tAttrs) {
        if(tElement.children().length === 0) {
          tElement.append('<canvas id="emotionReaderFeedback"></div>');
        }
        return {
          post: function(scope, element, attrs) {
            const elementHandle = 'emotionReaderFeedback';
            var $element = $(element);
            var $canvas = $element.find('canvas#'+elementHandle);

            var canvasWidth = parseInt( $canvas.width() );
            var canvasHeight = parseInt( $canvas.height() );

            var callbackReady = function callbackReady(e) {
              console.log("emotionReaderFeedback - callbackReady - ",e);
            };

            if( emotionReaderService.isReady === false ) {
              emotionReaderService.initialise( canvashWidth, canvasHeight,
                                               {
                                                 canvasId: elementHandle,
                                                 NNCPath: '',
                                                 callbackReady: callbackReady,
                                                 videoSettings: {
                                                   // not overriding defaults
                                                 }
                                               });
            }

            scope.$watch( function(x) {
              // start();
            });
          }
        };
      }
    };
  }

  function emotionReaderCameraMarker() {
    return{
      restrict: 'A',
      scope: true,
      compile: function(tElement, tAttrs) {


      }
    };
  }

  function emotionReaderResultMenu() {
    return{
      restrict: 'A',
      scope: true,
      compile: function(tElement, tAttrs) {


      }
    };
  }

})();
