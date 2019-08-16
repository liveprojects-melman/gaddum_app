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
    'MoodedPlaylist',
    'userProfilerService',
    'StatementCriteria'
  ];

  function playlistViewModalController(
    $scope,
    playlistViewModal,
    playlistEditModal,
    playlistService,
    addToPlaylistWizard,
    GenericTrack,
    howAreYouModal,
    MoodedPlaylist,
    userProfilerService,
    StatementCriteria
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
    playlistViewModal.closeCheckFalse();
  }
  function fnCallbackHowAreYouOkPlay(emotion){
    var arrayTrack = [];
    var mooded= null;
    var moodedArray =[];
    arrayTrack.push(currentTrack);
    mooded = MoodedPlaylist.build(emotion,arrayTrack);
    moodedArray.push(mooded);
    playlistService.asyncPlay(moodedArray);
    console.log(moodedArray);
  }
  function playPlaylist(){

    howAreYouPlayPlaylist();
  }
  var currentTrack = null;
  function howAreYouPlayPlaylist(){
    howAreYouModal.open(null,fnCallbackhowAreYouPlayPlaylist,fnCallbackHowAreYouCancel);
    playlistViewModal.closeCheckFalse();
  }
  function fnCallbackhowAreYouPlayPlaylist(emotion){
    var mooded= null;
    var moodedArray =[];
    mooded = MoodedPlaylist.build(emotion,vm.params.tracks);
    moodedArray.push(mooded);
    playlistService.asyncPlay(moodedArray);
    console.log(moodedArray);
  }
  function fnCallbackHowAreYouCancel(){
    console.log("modal canceled");
  }
  function addToPlaylist(track){
    var trackToAdd = [];
    trackToAdd.push(track);
    addToPlaylistWizard.open(trackToAdd,fnCallbackAddToPlaylistOk,fnCallbackAddToPlaylistCancel);
    playlistViewModal.closeCheckFalse();
  }
  function addPlaylistToPlaylist(){
    addToPlaylistWizard.open(vm.params.tracks,fnCallbackAddToPlaylistOk,fnCallbackAddToPlaylistCancel);
    playlistViewModal.closeCheckFalse();
  }
  function fnCallbackAddToPlaylistOk(){
    
  }
  function fnCallbackAddToPlaylistCancel(){
    console.log("modal canceled");
  }
  function asyncMakeTrackStatement(track){
    currentTrack = track;
    howAreYouTrack();
    playlistViewModal.closeCheckFalse();
  }
  function howAreYouTrack(){
    howAreYouModal.open(null,fnCallbackHowAreYouOkTrack,fnCallbackHowAreYouCancel);
  }
  function fnCallbackHowAreYouOkTrack(emotion){
    var StatCrit = StatementCriteria.build(emotion,currentTrack);
    playlistService.asyncMakeTrackStatement(StatCrit);
  }

  vm.playPlaylist = playPlaylist;
  vm.asyncMakeTrackStatement=asyncMakeTrackStatement;
  vm.addToPlaylist=addToPlaylist;
  vm.addPlaylistToPlaylist=addPlaylistToPlaylist;
  vm.play=play;

    

    
  }
})();