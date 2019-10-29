(function () {
    'use strict';

  var postStartState = 'gaddum.mood';

    angular
        .module('gaddum.permissions')
        .controller('permissionsDirectiveController', control);

    control.$inject = [
      '$state',
      '$scope',
      'permissionsService',
      'permissionsListenerService',
      '$ionicPlatform',
      '$window',
      'playlistService'
    ];

    function control(
      $state,
      $scope,
      permissionsService,
      permissionsListenerService,
      $ionicPlatform,
      $window,
      playlistService
    ) {
      var vm = angular.extend(this, {

      });
//      console.log("permissions controller checking in!");

      vm.goMain = function() {
        playlistService.asyncSeekPlaylists("").then(function(result){
          if(result.length===0){
            postStartState = 'gaddum.playlists';
          }
          else{
            postStartState = 'gaddum.mood';
          }
          permissionsListenerService.initialise(null);
          $state.go(postStartState);
          deferred.resolve();
        });
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
            console.log("has all permissions");
            vm.visible = false;
            permissionsListenerService.controllerNotifyGranted();

          } else {
            vm.visible=true;
            console.log("hasnt all permissions",vm.visible);
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
