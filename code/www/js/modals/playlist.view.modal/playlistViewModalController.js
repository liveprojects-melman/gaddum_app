(function () {
  'use strict';
  angular
    .module('playlistViewModule')
    .controller('playlistViewModalController', playlistViewModalController);

  playlistViewModalController.$inject = [
    '$scope',
    'playlistViewModal',
    'playlistEditModal',
    'playlistService',
    'addToPlaylistWizard',
    'GenericTrack',
    'howAreYouModal',
    'Playlist',
    'MoodedPlaylist',
    'userProfilerService'
  ];

  function playlistViewModalController(
    $scope,
    playlistViewModal,
    playlistEditModal,
    playlistService,
    addToPlaylistWizard,
    GenericTrack,
    howAreYouModal,
    Playlist,
    MoodedPlaylist,
    userProfilerService
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
  
  function play(track){
    console.log("track",track);
    currentTrack = track;
    console.log("current",currentTrack);
    howAreYouPlay();
  }
  var currentTrack = null;
  function howAreYouPlay(){
    howAreYouModal.open(null,fnCallbackHowAreYouOkPlay,fnCallbackHowAreYouCancel);
  }
  function fnCallbackHowAreYouOkPlay(emotion){
    var arrayTrack = [];
    var playlist=null;
    var mooded= null;
    var moodedArray =[];
    arrayTrack.push(currentTrack);
    playlist = Playlist.build(null, null, arrayTrack);
    mooded = MoodedPlaylist.build(emotion,playlist);
    moodedArray.push(mooded);
    playlistService.asyncPlay(moodedArray);
    console.log(moodedArray);
  }
  function fnCallbackHowAreYouCancel(){
    console.log("modal canceled");
  }
  function addToPlaylist(track){
    addToPlaylistWizard.open(track,fnCallbackAddToPlaylistOk,fnCallbackAddToPlaylistCancel);
  }
  function fnCallbackAddToPlaylistOk(){
    
  }
  function fnCallbackAddToPlaylistCancel(){
    console.log("modal canceled");
  }
  function asyncMakeTrackStatement(track){
    currentTrack = track;
    howAreYouTrack();
  }
  function howAreYouTrack(){
    howAreYouModal.open(null,fnCallbackHowAreYouOkTrack,fnCallbackHowAreYouCancel);
  }
  function fnCallbackHowAreYouOkTrack(emotion){
    playlistService.asyncMakeTrackStatement(currentTrack,emotion);
  }

  vm.asyncMakeTrackStatement=asyncMakeTrackStatement;
  vm.addToPlaylist=addToPlaylist;
  vm.play=play;

    

    
  }
})();