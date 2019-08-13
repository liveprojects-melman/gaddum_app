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
      vm.tracks=vm.params.tracks;
      console.log("tracks",vm.tracks);
      console.log("params22!",vm.params);
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
      vm.tracks.splice(fromIndex, 1);
      vm.tracks.splice(toIndex, 0, song);
      playlistEditModal.trackData(vm.tracks);
      console.log(vm.tracks);
    };
    vm.textChange = function(){
      playlistEditModal.nameData(vm.params.name);
    }

    vm.deleteSong=function(index){
      vm.tracks.splice(index,1);
      playlistEditModal.trackData(vm.tracks);
    }

    vm.showDeleteToggle=function(){
      vm.showDelete=!vm.showDelete;
    }
    vm.showReorderToggle=function(){
      vm.showReorder=!vm.showReorder;
    }






    

    
  }
})();