(function () {
    'use strict';

    angular
        .module('gaddum.musicProviderLogin')
        .controller('musicProviderLoginDirectiveController', control);

    control.$inject = [
      'gaddumMusicProviderService'
    ];

    function control(
      gaddumMusicProviderService
      ) {
      var vm = angular.extend(this, {

      });
      vm.visible = true;
      function login(){
        vm.visible = false;
        gaddumMusicProviderService.asyncSetSupportedServiceProvider("gaddumMusicProviderSpotifyService").then(
          function(){
            gaddumMusicProviderService.asyncLogin();
          }
        );
      }
      vm.login=login;
    }
})();
