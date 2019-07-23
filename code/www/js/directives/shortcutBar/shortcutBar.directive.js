(function(){

    var app = angular
        .module('gaddum.shortcutBar',[])
        .directive('gaddumShortcutBar', function(){
          return {
            restrict: 'E',
            scope:{

            },
            templateUrl: "js/directives/shortcutBar/shortcutBar.directive.html",
            controller: 'gaddumShortcutBarController',
            controllerAs: 'sc',
            bindToController: true
            //remember to do the index and name of directive stuff
          };
      });
  }());
  