(function(){

  var app = angular.module('gaddum.browse').directive('browseDirective', function(){
      
      return {
          restrict: 'E',
          scope:{ 
              
          },
          templateUrl: "js/directives/browse/browse.directive.html",
          controller: 'browseDirectiveController',
          controllerAs: 'bm',
          bindToController: true
          //remember to do the index and name of directive stuff
      };
  });
}());
  