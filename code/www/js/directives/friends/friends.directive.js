(function(){

  var app = angular.module('gaddum.friends').directive('friendsDirective', function(){
      
      return {
          restrict: 'E',
          scope:{ 
              
          },
          templateUrl: "js/directives/friends/friends.directive.html",
          controller: 'friendsDirectiveController',
          controllerAs: 'vm',
          bindToController: true
          //remember to do the index and name of directive stuff
      };
  });
}());
  