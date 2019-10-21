(function() {
  'use strict';

  angular
    .module('gaddum.mood', [
      'ionic',
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider  ) {
      $stateProvider
        .state('gaddum.mood', {
          cache: true,
          url: '^/mood',
          resolve: (['gaddumShortcutBarService',function(gaddumShortcutBarService){
            gaddumShortcutBarService.clearContextMenu();
          }]),
          views: {
            'mood@gaddum' : {
              templateUrl: 'js/modules/mood/mood.html',
              controller: "moodController",
              controllerAs: "mc"
            }
          },
          onEnter: function(gaddumMoodServiceMasterSwitchService){
            gaddumMoodServiceMasterSwitchService.turnOn();
          },
          onExit: function(gaddumMoodServiceMasterSwitchService){
            gaddumMoodServiceMasterSwitchService.turnOff();
          }

        });
    });
})();
