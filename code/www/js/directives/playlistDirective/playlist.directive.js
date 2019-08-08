(function(){

    var app = angular.module('gaddum.playlistDirective', []).directive('playlist', function(){
        
        return {
            restrict: 'E',
            scope:{ 
                
                
            },
            templateUrl: "js/directives/playlistDirective/playlist.directive.html",
            controller: 'playlistController',
            controllerAs: 'vm',
            bindToController: true
            //remember to do the index and name of directive stuff
        };
    });
}());
    