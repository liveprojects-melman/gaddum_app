(function() {
  'use strict';

  angular
    .module('gaddum.mood', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider  ) {
      $stateProvider
        .state('gaddum.mood', {
          cache: false,
          url: '^/mood',
          views: {
            'mood@gaddum' : {
              templateUrl: 'js/modules/mood/mood.html',
              controller: "moodController",
              controllerAs: "mc"
            }
          },
          onEnter: function(gaddumMoodServiceMasterSwitchService){
            console.log("TURN ON!");
            gaddumMoodServiceMasterSwitchService.turnOn();
          },
          onExit: function(gaddumMoodServiceMasterSwitchService){
            console.log("TURN OFF!")
            gaddumMoodServiceMasterSwitchService.turnOff();
          }

        });
    });
})();
