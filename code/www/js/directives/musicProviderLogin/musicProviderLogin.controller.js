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
        
        gaddumMusicProviderService.asyncSetSupportedServiceProvider("gaddumMusicProviderSpotifyService").then(
          function(){
            gaddumMusicProviderService.asyncLogin().then(
              function(result){
                vm.visible = false;
              },
              function(error){
                vm.visible = true;
              }
            )
          }
        );
      }
      vm.login=login;
    }
})();
