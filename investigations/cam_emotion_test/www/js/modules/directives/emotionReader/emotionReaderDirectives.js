(function(){
  'use strict';

  angular
    .module('emotionReader')
    .directive('emotionReaderFeedback', emotionReaderFeedback)
    .directive('emotionReaderCameraState', emotionReaderCameraState)
    .directive('emotionReaderResultFeedback', emotionReaderResultMenu);

  emotionReaderFeedback.$inject = [ 'emotionReaderService' ];

  function emotionReaderFeedback( emotionReaderService ) {
    console.log("ERS=",emotionReaderService);
    return{
      restrict: 'E',
      scope: {},
      link: //function(scope, tElement, tAttrs) {
        //if(tElement.children().length === 0) {
        //  tElement.append('<canvas id="emotionReaderFeedback"></div>');
        //}
        //return {
      /*  post:*/ function(scope, element, attrs) {

        element.append('<canvas id="emotionReaderFeedback"></div>');

        const elementHandle = 'emotionReaderFeedback';
        var $element = $(element);
        var $canvas = $element.find('canvas#'+elementHandle);

        var canvasWidth = parseInt( $canvas.width() );
        var canvasHeight = parseInt( $canvas.height() );

        if( emotionReaderService.isReady === false ) {
          emotionReaderService.initialise( canvasWidth, canvasHeight,
                                           {
                                             canvasId: elementHandle,
                                             videoSettings: {
                                               // not overriding defaults
                                             }
                                           });
        }

        scope.$watch( function(x) {
          // start();
        });
//          }
//        };
      }
    };
  }

  function emotionReaderCameraState() {
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
