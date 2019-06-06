(function(){
  'use strict';

  angular
    .module('emotionReader')
    .directive('emotionReaderFeedback', emotionReaderFeedback)
    .directive('emotionReaderCameraState', emotionReaderCameraState)
    .directive('emotionReaderResultFeedback', emotionReaderResultMenu);

  emotionReaderFeedback.$inject = [ 'emotionReaderService' ];
  

  function emotionReaderFeedback( emotionReaderService ) {
    return{
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {

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

        });
      }
    };
  }

  emotionReaderCameraState.$inject = [ 'moodService','emotionReaderService' ];

  function emotionReaderCameraState(moodService,emotionReaderService) {
    return{
      restrict: 'E',
      scope: { },
      replace: true,
      templateUrl: 'js/modules/directives/emotionReader/partials/emotionReaderCameraState.html',
      link: function(scope, element, attrs) {
        scope.running = emotionReaderService;
        scope.face = emotionReaderService.face;
        if(scope.cameraError===true) {
          alert("camera error");
        }
      }
    };
  }

  emotionReaderResultMenu.$inject = [ 'moodService' ];

  function emotionReaderResultMenu(moodService) {
    return{
      restrict: 'E',
      replace: true,
      scope: {
        emotionChosen: '=',
        currentEmotion: '='
      },
      templateUrl: 'js/modules/directives/emotionReader/partials/emotionReaderResultMenu.html',
      link: function(scope, element, attrs) {
        scope.emotions = moodService.EMOTIONS;
        if(moodService.emotionChosen===true) {
          scope.emotionChosen = moodService.emotionChosen;
          scope.currentEmotion = moodService.currentEmotion;
        }
      }
    };
  }

})();
