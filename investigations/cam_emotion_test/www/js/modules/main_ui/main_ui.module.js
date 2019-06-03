(function(){
  'use strict';

  angular.module('main_ui', [
    'ui.router',
    'ngAnimate',
    'ionic',
    'emotionReader' //,
//    'ion-slide-box-tabs'
  ])
    .config(function( $stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          cache:true,
          url: '/'
        })
/*        .state('groupsList', {
          cache:true,
          url: '/main/groups'
        });*/
    });
})();
