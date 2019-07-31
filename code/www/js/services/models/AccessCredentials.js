(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('AccessCredentials', AccessCredentials)
    ;

  AccessCredentials.$inject = [

  ];
  function AccessCredentials(
  ) {
    function AccessCredentials(
      accessToken,
      expiresAt,
      refreshToken
    ) {
      // Public properties, assigned to the instance ('this')
      this.accessToken = accessToken;
      this.expiresAt = expiresAt;
      this.refreshToken = refreshToken;
    

    this.getAccessToken = function() {
      return this.accessToken;
    }
    this.getExpiresAt =function() {
      return this.expiresAt;
    }
    this.getRefreshToken = function() {
      return this.refreshToken;
    }

    this.hasExpired = function() {
      var currentTimeJavaEpoch_s = Date.now() / 1000;

      var result = currentTimeJavaEpoch_s >= this.expiresAt;

      return result;
    }

    }
    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    AccessCredentials.build = function (accessToken, expiresAt, refreshToken) {
      var result = null;
      if (accessToken && expiresAt && refreshToken) {


        result = new AccessCredentials(
          accessToken,
          expiresAt,
          refreshToken
        );
      }
      return result;

    };

    /**
     * Return the constructor function
     */
    return AccessCredentials;

  }
})();
