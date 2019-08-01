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
          virtual: true,
          resolve: {
            templateNowIs: function( permissionsService ) {
              if(permissionsService.hasAllRequiredPermissions()===true) {
                return('js/modules/permissions/permissions.html');
              } else {
                return('js/modules/main_ui/main_ui.html');
              }
            }
          },
//          abstract: true,
          views: {
            'gaddum': function(templateNowIs){
              return{
                templateUrl: templateNowIs, //'js/modules/main_ui/main_ui.html',
                controller: 'main_uiController',
                controllerAs: 'mlc'
              }
            },
            'profile@gaddum': {
              templateUrl: 'js/modules/profile/profile.html',
              controller: "profileController",
              controllerAs: "pc"
            }
          }
        });
//        .state('home', {
//          cache:true,
//          url: '/'
//        });
/*        .state('groupsList', {
          cache:true,
          url: '/main/groups'
        });*/
    });
})();
