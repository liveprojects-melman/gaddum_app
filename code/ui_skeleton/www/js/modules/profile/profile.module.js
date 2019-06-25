(function(){
  'use strict';

  angular.module('gaddum.profile', [
    'ui.router',
    'ngAnimate'
  ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.profile', {
          url: '/profile',
          cache:false,
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
