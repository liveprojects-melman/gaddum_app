(function(){

    var app = angular
        .module('gaddum.musicProviderLogin',[])
        .directive('musicProviderLoginDirective', function(){

        return {
            restrict: 'E',
            scope:{
            },
            templateUrl: "js/directives/musicProviderLogin/musicProviderLogin.html",
            controller: 'musicProviderLoginDirectiveController',
            controllerAs: 'vm',
            bindToController: true

        };
    });
}());

