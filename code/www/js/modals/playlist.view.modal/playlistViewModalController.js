(function () {
  'use strict';
  angular
    .module('playlistViewModule')
    .controller('playlistViewModalController', playlistViewModalController);

  playlistViewModalController.$inject = [
    '$scope',
    'playlistViewModal',
    'playlistEditModal'

  ];

  function playlistViewModalController(
    $scope,
    playlistViewModal,
    playlistEditModal
  ) {
    var vm = angular.extend(this, {
      params:null,
      tracks:[],
      playlist:[]
    });
    $scope.playlistViewModal = playlistViewModal;
    function init() {
      vm.params = playlistViewModal.getParams();
      vm.playlist=vm.params.tracks;
      console.log("playlist",vm.playlist);
      console.log("params!",vm.params);
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
      ;
      playlistEditModal.open(modalParams,saveChanges,refresh);
      //var,ok,c
  };

  function saveChanges(editedPlaylist){
    console.log(editedPlaylist);
  };

  function refresh(){
    console.log("no changes");
  }


    

    
  }
})();