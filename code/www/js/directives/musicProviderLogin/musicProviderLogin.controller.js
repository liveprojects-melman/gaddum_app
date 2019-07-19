(function () {
    'use strict';

    angular
        .module('gaddum.musicProviderLogin')
        .controller('musicProviderLoginDirectiveController', control);

    control.$inject = [
    ];

    function control(
    ) {
      var vm = angular.extend(this, {

      });
      vm.visible = true;
      function login(){
        vm.visible = false;
      }
      vm.login=login;
    }
})();
