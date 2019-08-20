(function () {
  'use strict';
  angular
    .module('playlistCreateModule')
    .controller('playlistCreateModalController', playlistCreateModalController);

    playlistCreateModalController.$inject = [
    '$scope',
    'playlistCreateModal'
    

  ];

  function playlistCreateModalController(
    $scope,
    playlistCreateModal
    
  ) {
    var vm = angular.extend(this, {
      params:null,
      playlistName:null,
      disableOk:true
    });
    $scope.playlistCreateModal = playlistCreateModal;
    function init() {
      vm.params = playlistCreateModal.getParams();
    };
    init();
    

    vm.returnData = function () {
      playlistCreateModal.callback(vm.playlistName);
    };
    vm.cancel = function(){
      playlistCreateModal.cancel();
    }
    vm.textChange = function(){
      if(vm.playlistName.length === 0){
        vm.disableOk = true;
      }
      else{
        vm.disableOk = false;
      }
    }

    






    

    
  }
})();