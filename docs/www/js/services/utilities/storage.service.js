(function() {
	'use strict';

	angular
		.module('utilitiesjs')
		.factory('storage', storage);

	_.$inject = [
        '$window'
    ];

	function storage($window) {
        var localStorage =  $window.localStorage;
        return localStorage;
	}
})();