(function(){

    var app = angular.module('gaddum.spinner',[]).directive('spinnerDirective', function(){
        
        return {
            restrict: 'E',
            replace: true,
            scope:{ 
                
            },
            templateUrl: "js/directives/headerSpinner/spinner.directive.html",
            controller: 'spinnerController',
            controllerAs: 'vm',
            bindToController: true
            //remember to do the index and name of directive stuff
        };
    });
  }());