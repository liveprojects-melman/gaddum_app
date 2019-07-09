(function() {
	'use strict';

	angular
		.module('gaddum.permissions', [
			'ionic',
      'ui.router',
      'ngAnimate',
		])
    .config(function( $stateProvider, $urlRouterProvider) {
      $stateProvider
        .state( getPermissionsState, {
          url: '/please',
          templateUrl: 'js/modules/permissions/please.html',
//          controller: 'main_uiController',
//          controllerAs: 'mlc'
        });
    });

 	console.log("permissions module started");
})();
