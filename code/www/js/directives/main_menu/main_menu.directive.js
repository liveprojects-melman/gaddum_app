(function(){

  var app = angular.module('gaddum.main_ui').directive('mainMenuDirective', function(){
      
      return {
          restrict: 'E',
          replace: true,
          scope:{ 
              
          },
          templateUrl: "js/directives/main_menu/main_menu.directive.html",
          controller: 'mainMenuController',
          controllerAs: 'vm',
          bindToController: true
          //remember to do the index and name of directive stuff
      };
  });
}());
  