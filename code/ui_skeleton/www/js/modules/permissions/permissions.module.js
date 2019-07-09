(function() {
	'use strict';

	console.log("getPermissionsState is "+getPermissionsState);

	angular
		.module('gaddum.permissions', [
			'ionic',
      'ui.router',
      'ngAnimate',
		])
    .config(function( $stateProvider, $urlRouterProvider) {
      $stateProvider
        .state( getPermissionsState, {
          url: '^/please',
          templateUrl: 'js/modules/permissions/please.html',
	  		  controller: function($scope){

		      }
        });
    });
})();
