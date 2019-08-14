(function () {
  'use strict';
  angular
    .module('playlistViewModule')
    .controller('playlistViewModalController', playlistViewModalController);

  playlistViewModalController.$inject = [
    '$scope',
    'playlistViewModal',
    'playlistEditModal',
    'playlistService'

  ];

  function playlistViewModalController(
    $scope,
    playlistViewModal,
    playlistEditModal,
    playlistService
  ) {
    var vm = angular.extend(this, {
      params:null,
      playlist:[]
    });
    $scope.playlistViewModal = playlistViewModal;
    function init() {
      vm.params = playlistViewModal.getParams();
      console.log("params!!",vm.params);
    };
    init();
    

    vm.returnData = function () {
      console.log("?");
    };

    vm.editPlaylist= function(){
      var modalParams=vm.params;
      playlistViewModal.closeCheckFalse();
      playlistEditModal.open(modalParams,saveChanges,refreshTrack);
      //var,ok,c
  };

  function saveChanges(editedPlaylist){
    console.log(editedPlaylist);
  };

  function refreshTrack(tracks,name){
    if (tracks){
      vm.params.tracks = tracks;
    }
    if(name){
      vm.params.playlist.setName(name);
    }
    playlistViewModal.data(vm.params.tracks, vm.params.playlist);
  }


    

    
  }
})();