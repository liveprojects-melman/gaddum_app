(function () {
    'use strict';

    angular
        .module('gaddum.permissions')
        .controller('eventsDirectivePermissionsController', control);

    control.$inject = [
        '$state',
        '$scope',
        'permissionsSrvc',
        '$ionicPlatform'
        ];

    function control(
        $state,
        $scope,
        permissionsSrvc,
        $ionicPlatform
    ) {
        var vm = angular.extend(this, {

         });
      console.log("permissions controller checking in!");
         vm.hardwareBackButton = $ionicPlatform.registerBackButtonAction(function () {
            //called when hardware back button pressed (android etc)
            vm.goMain();
          }, 100);
          $scope.$on('$destroy', vm.hardwareBackButton);

          vm.goMain = function() {
            $state.go('main');
          };

         vm.permissions = false;

         $ionicPlatform.ready(function () {
          setTimeout(function(){
            vm.getPermissions();
          }, 50);

        });

         vm.getPermissions = function() {
          permissionsSrvc.returnPermissionStates().then(function(response){
              if(response.hasAllRequiredPermissions){
                vm.goMain();
              } else {
                vm.permissions = response;
                console.log(vm.permissions)
              }
          });
         };

          vm.requestPermission = function(permissionType){
            permissionsSrvc.requestPermission(permissionType).then(vm.getPermissions);
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
