

(function () {
  'use strict';

  angular
    .module('gaddum.playlists')
    .controller('addToPlaylistModalController', addToPlaylistModalController);

    addToPlaylistModalController.$inject = [
      'addToPlaylistWizard',
      '$scope',
      '$timeout',
      '$q',
      'playlistService'

  ];
  
  function addToPlaylistModalController(
    addToPlaylistWizard,
    $scope,
    $timeout,
    $q,
    playlistService
  ) {
    var moodIdDict = {};
    var mc = angular.extend(this, {
      itemSelected:false,
      emotionSelected: ''
    });
    $scope.addToPlaylistWizard=addToPlaylistWizard;
    function init() {
      
      mc.state = true;
      mc.params =addToPlaylistWizard.getParams();
      console.log(mc.params);
      //mc.playlistArray = playlistService.asyncSeekPlaylists();
      
    }
    init();
    function close(){
      addToPlaylistWizard.close();
    }
    function createPlaylist(){

    }
    function changeState(){
      mc.state = !mc.state;
    }
    function add(){

    }
    mc.add = add;
    mc.close=close;
    mc.createPlaylist= createPlaylist;
    mc.changeState=changeState;

  }
})();