

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
      'playlistService',
      'GenericTrack'

  ];
  
  function addToPlaylistModalController(
    addToPlaylistWizard,
    $scope,
    $timeout,
    $q,
    playlistService,
    GenericTrack
  ) {
    var mc = angular.extend(this, {
      itemSelected:false,
      emotionSelected: ''
    });
    $scope.addToPlaylistWizard=addToPlaylistWizard;
    function init() {
      
      mc.state = true;
      mc.displayArray=[];
      mc.params =addToPlaylistWizard.getParams();
      console.log(mc.params);
      playlistService.asyncSeekPlaylists("").then(function(result){
        mc.playlistArray = result;
        mc.playlistArray.forEach(function(element){
          mc.displayArray.push({name:element.getName(),value:false});
        });
      });
      
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
      var count = 0;
      var playlists=[];
      mc.displayArray.forEach(function(element){
        if(element.value){
          playlists.push(mc.playlistArray[count]);
        }
        count++;
        
      });
      playlists.forEach(function(playlist){
        playlistService.asyncGetPlaylistTracks(playlist).then(function(result){
          //give trackInfo(mc.params) to spotify service
          var trackGen = GenericTrack.build(mc.params.getPlayerUri(),mc.params.getName(),mc.params.getAlbum(),mc.params.getArtist(),mc.params.getDuration_s());
          result.push(trackGen);
          playlistService.asyncSetPlaylistTracks(playlist,result).then(function(result){
            addToPlaylistWizard.close();
          });
        });
        
      });
    }
    function playlistSelected(index){
      mc.displayArray[index].value = !mc.displayArray[index].value;
    }
    mc.playlistSelected = playlistSelected;
    mc.add = add;
    mc.close=close;
    mc.createPlaylist= createPlaylist;
    mc.changeState=changeState;

  }
})();