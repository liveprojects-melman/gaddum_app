(function() {
	'use strict';

	angular
		.module('gaddum.permissions', [
			'ionic',
      'ui.router',
      'ngAnimate'
		])
    .config(function( $stateProvider, $urlRouterProvider) {
      $stateProvider
        .state( 'permissions', {
          url: '^/please',
          templateUrl: 'js/modules/permissions/please.html',
	  		  controller: function($scope){
            console.log("HERE IT IS, THE PERMISSIONS MODULE CONTROLLER FOR PLEASE");
            //
		      }
        });
    });
})();
