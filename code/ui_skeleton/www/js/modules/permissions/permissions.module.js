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
	      //controller: 'permissionsDirectiveController',
		  //controllerAs: 'mlc'
		  controller: function($scope){
			  // thanks!
			  console.log('please controller is up');
		  }
        });
    });

 	console.log("permissions module started");
})();
