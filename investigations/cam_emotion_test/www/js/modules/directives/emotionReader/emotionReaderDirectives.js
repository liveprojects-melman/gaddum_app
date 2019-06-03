(function(){
  'use strict';

  angular
    .module('emotionReader', [])
    .directive('emotionReaderFeedback', emotionReaderFeedback)
    .directive('emotionReaderCameraMarker', emotionReaderCameraMarker)
    .directive('emotionReaderResultFeedback', emotionReaderResultMenu);

  function emotionReaderFeedback() {
    return{
      restrict: 'A',
      scope: true,
      compile: function(tElement, tAttrs) {
        if(tElement.children().length === 0) {
          tElement.append('<canvas id="emotionReaderFeedback"></div>');
        }
        return {
          post: function(scope, element, attrd) {
            var $element = $(element);

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
