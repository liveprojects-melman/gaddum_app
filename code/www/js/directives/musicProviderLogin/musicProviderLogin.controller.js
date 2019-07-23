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
    function login() {

      gaddumMusicProviderService.asyncSetSupportedServiceProvider("gaddumMusicProviderSpotifyService")
        .then(gaddumMusicProviderService.asyncIsLoggedIn)
        .then(
          function (result) {
            console.log("login");
            vm.visible = false;
          },
          gaddumMusicProviderService.asyncLogin)
        .then(
          function (result) {
            vm.visible = false;
            console.log("login");
          },
          function (error) {
            vm.visible = true;
            console.log(error);
          }
        );
    }
    vm.login = login;
  }
})();
