(function(){
  'use strict';

  angular
    .module( 'gaddum.httpInterceptor', [ ] )
    .factory('dataApiRecoverer',['$q', function($q){
      var dataApiRecoverer = {
        responseError: function responseError(response){
          console.log("🚨gaddum.httpInterceptor: responseError, ", response);

          return $q.reject(response);
        },
        requestError: function(rejectReason){
          console.log("🚨gaddum.httpInterceptor: requestError, ", rejectReason);

          return $q.reject(rejectReason);
        }
      };
      return dataApiRecoverer;
    }]);

  module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('dataApiRecoverer');
  }]);
})();
