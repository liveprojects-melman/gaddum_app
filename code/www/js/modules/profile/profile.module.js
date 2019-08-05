(function(){
  'use strict';

  angular.module('gaddum.profile', [
    'ui.router',
    'ngAnimate'
  ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.profile', {
          url: '^/profile',
          cache:false,
          redirectTo: 'gaddum.profile.view'
        })
        .state('gaddum.profile.view', {
          cache: false,
          url: '^/profile/view',
          resolve: (['gaddumShortcutBarService',function(gaddumShortcutBarService){
            gaddumShortcutBarService.setContextMenu({});
          }]),
          views: {
            'profile@gaddum': {
              templateUrl: 'js/modules/profile/profile.html',
              controller: "profileController",
              controllerAs: "pc"
            }
          }
        });
    });
})();
