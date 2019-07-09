(function(){

  var app = angular
      .module('gaddum.mood')
      .directive('moodDirective', function(){
        return {
          restrict: 'E',
          scope:{
            firstTime: '=',
            enable: '=',
          },
          templateUrl: "js/directives/mood/mood.directive.html",
          controller: 'moodDirectiveController',
          controllerAs: 'vm',
          bindToController: true
          //remember to do the index and name of directive stuff
        };
    });
}());
