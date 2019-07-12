(function () {
    'use strict';

    angular
        .module('gaddum.permissions')
        .controller('permissionsDirectiveController', control);

    control.$inject = [
      '$state',
      '$scope',
      'permissionsService',
      '$ionicPlatform',
      '$window'
    ];

    function control(
      $state,
      $scope,
      permissionsService,
      $ionicPlatform,
      $window
    ) {
      var vm = angular.extend(this, {

      });
      console.log("permissions controller checking in!");

      vm.goMain = function() {
        //$state.go( startState );
      };

      vm.permissions = false;

      $ionicPlatform.ready(function () {
        setTimeout(function(){
          vm.getPermissions();
        }, 50);

        vm.visible = false;

      });

      vm.getPermissions = function() {

        if($window.hasOwnProperty('device')===false) {
          vm.visible = false;
          return;
        }

        permissionsService.returnPermissionStates().then(function(response){
          if(response.hasAllRequiredPermissions){
            //                vm.goMain();
            vm.visible = false;
          } else {
            vm.visible=true;
            vm.permissions = response;
          }
        });
      };

      vm.requestPermission = function(permissionType){
        permissionsService.requestPermission(permissionType).then(vm.getPermissions);
      };

      document.addEventListener("deviceready", function() {
        /**
         * when app is minimised, we should close wikitude..
         * however this causes app crash!
         */

        document.addEventListener("pause", function() {
          //app is minimised.
          },
        false);
        document.addEventListener("resume", function(){
          //app is maximised.
          vm.getPermissions();
          },
        false);
        },
      false);

    }
})();
