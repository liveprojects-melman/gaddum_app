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
      tracks:[],
      playlist:[]
    });
    $scope.playlistViewModal = playlistViewModal;
    function init() {
      vm.params = playlistViewModal.getParams();
      vm.tracks=vm.params.tracks;
      console.log("params!!",vm.params);
    };
    init();
    

    vm.returnData = function () {
      console.log("?");
    };

    vm.cancel = function () {
      playlistViewModal.cancel();
      playlistViewModal.close();
    };

    vm.editPlaylist= function(PlaylistToEdit){
      //modal
      //var viewedPlaylist=playlistService.getPlaylist(PlaylistToGet);
      console.log("p2g",vm.params);;
      var modalParams=vm.params;
      playlistViewModal.closeCheckFalse();
      playlistEditModal.open(modalParams,saveChanges,refresh);
      //var,ok,c
  };

  function saveChanges(editedPlaylist){
    console.log(editedPlaylist);
  };

  function refresh(tracks,name){
    vm.tracks = tracks;
    vm.params.playlist.setName(name);
    playlistService.asyncSetPlaylistTracks(vm.params.playlist,vm.tracks);
    console.log("no changes");
  }


    

    
  }
})();