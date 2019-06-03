(function(){
  'use strict';

  angular
    .module('emotionReader')
    .directive('emotionReaderFeedback', emotionReaderFeedback)
    .directive('emotionReaderCameraState', emotionReaderCameraState)
    .directive('emotionReaderResultFeedback', emotionReaderResultMenu);

  emotionReaderFeedback.$inject = [ 'emotionReaderService' ];

  function emotionReaderFeedback( emotionReaderService ) {

    var link = function link(scope, element, attrs) {

      element.append('<canvas id="emotionReaderFeedback"></div>');

      var elementHandle = 'emotionReaderFeedback';
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
    };

    return{
      restrict: 'E',
      scope: {},
      link: link
    };
  }

  function emotionReaderCameraState() {
    return{
      restrict: 'E',
      scope: {},
      compile: function(tElement, tAttrs) {


      }
    };
  }

  function emotionReaderResultMenu() {
    return{
      restrict: 'E',
      scope: {},
      compile: function(tElement, tAttrs) {


      }
    };
  }

})();
