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
          abstract:true,
          url: '/'
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
