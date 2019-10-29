(function(){
  angular
    .module('gaddum.profileDirective', ['monospaced.qrcode','modalsProfile'])
    .directive('profile', function(){
      return {
        restrict: 'E',
        scope:{
        },
        templateUrl: "js/directives/profileDirective/profile.directive.html",
        controller: 'profileController',
        controllerAs: 'vm',
        bindToController: true
      };
    });
})();
