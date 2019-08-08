(function(){
  'use strict';

  angular.module('gaddum.main_ui', [
    'ui.router',
    'ngAnimate',
    'ionic'//,
//    'ion-slide-box-tabs'
  ])
    .config(function( $stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum', {
          url: '/',
          onEnter: ['startupSrvc',function(startupSrvc){
            gaddumMusicProviderService.initialise(loginModal.promiseLogin);                     }],
          //virtual: true,
          //abstract: true,
//          resolve:{
//            permissions:["permissionService", function(permissionService) {
//              return permissionService.hasAllRequiredPermissions;
//            }]
//          },
//          onEnter:['$state','permissionsService',function($state,permissionsService) {
            //if (permissions===false) {
 //           console.log("ASKING FOR PERMISSIONS...");
//            if(permissionsService.hasAllRequiredPermissions!=true){
//              console.log("You don't have permissions, rerouting!");
//              $state.go('permissions');
//            }
            //}
          //          }],
          onEnter: ['startupSrvc','gaddumMusicProviderService','loginModal',function onEnterForMain(startupSrvc,gaddumMusicProviderService,loginModal){
            gaddumMusicProviderService.initialise(loginModal.promiseLogin);
          }],
          views: {
            'gaddum': {
              templateUrl: 'js/modules/main_ui/main_ui.html',
              controller: 'main_uiController',
              controllerAs: 'mlc'
            },
            'profile@gaddum': {
              templateUrl: 'js/modules/profile/profile.html',
              controller: "profileController",
              controllerAs: "pc"
            }
          }
        });
    });
})();
