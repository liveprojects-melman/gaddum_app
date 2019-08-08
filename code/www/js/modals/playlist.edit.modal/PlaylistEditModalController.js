(function () {
  'use strict';
  angular
    .module('playlistEditModule')
    .controller('playlistEditModalController', playlistEditModalController);

  playlistEditModalController.$inject = [
    '$scope',
    'playlistEditModal'

  ];

  function playlistEditModalController(
    $scope,
    playlistEditModal
  ) {
    var vm = angular.extend(this, {
      params:null,
      tracks:[],
      playlist:[],
      showDelete:false,
      showReorder:false
    });
    $scope.playlistEditModal = playlistEditModal;
    function init() {
      vm.params = playlistEditModal.getParams();
      vm.playlist=vm.params.tracks;
      console.log("playlist",vm.playlist);
      console.log("params!",vm.params);
    };
    init();
    

    vm.returnData = function () {
      console.log("?");
    };

    vm.cancel = function () {
      playlistEditModal.cancel();
      playlistEditModal.close();
    };

    vm.reorderlog=function(song, fromIndex,toIndex){
      console.log(song, fromIndex,toIndex);
      vm.playlist.items.splice(fromIndex, 1);
      vm.playlist.items.splice(toIndex, 0, song);
      console.log(vm.playlist.items);
    };

    vm.deleteSong=function(index){
      vm.playlist.items.splice(index,1);
    }

    vm.showDeleteToggle=function(){
      vm.showDelete=!vm.showDelete;
    }
    vm.showReorderToggle=function(){
      vm.showReorder=!vm.showReorder;
    }






    

    
  }
})();