(function(){

    var app = angular.module('gaddum.profileDirective', ['monospaced.qrcode','modalsProfile']).directive('profile', function(){
        
        return {
            restrict: 'E',
            scope:{ 
                
                
            },
            templateUrl: "js/directives/profileDirective/profile.directive.html",
            controller: 'profileController',
            controllerAs: 'vm',
            bindToController: true
            //remember to do the index and name of directive stuff
        };
    });
}());
    