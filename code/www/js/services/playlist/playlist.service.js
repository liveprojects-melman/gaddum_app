(function () {
  'use strict;'

  angular
    .module('gaddum.playlists' )
    .factory('playlistService', playlistService)
    ;

  playlistService.$inject = [
    'dataApiService',
    'PlaylistIdentifier',
    'GenericTrack',
    '$q'
  ];
  function playlistService(
    dataApiService,
    PlaylistIdentifier,
    GenericTrack,
    $q
  ) {


    function asyncCreatePlaylist(name){
      return dataApiService.asyncCreatePlaylist(name);
    }

    function asyncSeekPlaylists(searchName){      
      return dataApiService.asyncSeekPlaylists(searchName);
    }

    function asyncSetPlayList(playlistIdentifier){
      return dataApiService.asyncSetPlayList(playlistIdentifier);
    }
    
    function asyncSetPlaylistTracks(playlistIdentifier, arrayGenericTracks){
      return dataApiService.asyncSetPlaylistTracks(playlistIdentifier, arrayGenericTracks);
    }

    function asyncGetPlaylistTracks(playlistIdentifier){
      return dataApiService.asyncGetPlaylistTracks(playlistIdentifier);
    }

    function asyncRemovePlaylist(playlistIdentifier){
      return dataApiService.asyncRemovePlaylist(playlistIdentifier);
    }



    var service = {
      asyncCreatePlaylist:asyncCreatePlaylist,
      asyncSeekPlaylists:asyncSeekPlaylists,
      asyncSetPlayList: asyncSetPlayList,
      asyncSetPlaylistTracks:asyncSetPlaylistTracks,
      asyncGetPlaylistTracks:asyncGetPlaylistTracks,
      asyncRemovePlaylist:asyncRemovePlaylist

    };

    return service;
  }
})();
