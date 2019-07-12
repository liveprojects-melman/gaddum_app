(function() {
	'use strict';

	angular
		.module('utilitiesjs')
		.factory('_', _);

	_.$inject = [
        '$window'
    ];

	function _($window) {
        if($window._){
            //Delete from window so it's not globally accessible.
            //  We can still get at it through _thirdParty however.
            $window._thirdParty = $window._thirdParty || {};
            $window._thirdParty._ = $window._;
            //IE8 doesn't do delete of window vars, make undefined if delete error
            try { delete $window._; } catch (e) {$window._ = undefined;}
        }
        var _ = $window._thirdParty._;
        return _; 
	}
})();