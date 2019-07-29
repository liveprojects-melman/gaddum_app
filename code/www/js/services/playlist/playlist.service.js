(function () {
  'use strict;'

  angular
    .module('gaddum.playlists' )
    .factory('playlistService', playlistService)
    ;

  playlistService.$inject = [
    'dataApiService',
    '$q',
    'gaddumMusicProviderService'
  ];
  function playlistService(
    dataApiService,
    $q,
    gaddumMusicProviderService
  ) {

    function addToPlaylist(TID,PID){

    }
    function seekPlaylist(searchName){

    }
    function createPlaylist(playlistName,arrayTracks){

    }
    function importAllPlaylists(){
        gaddumMusicProviderService.importAllPlaylists().then(function(result){
              var id=result.data.items[0].id
              
                gaddumMusicProviderService.getplaylistTracks(id).then(function(result2){

                    console.log("track",result2);
                }).catch(function(er){

                    console.log(er);
                });
            }).catch(function(er){

                console.log(er);
            });
    }
    function removePlaylist(PID){

    }
    function editPlaylist(PID, arrayTracks){

    }
    function checkIsGift(PID){

    }
    function moodEnable(PID){

    }
    function moodDisable(PID){

    }

    var service = {
        addToPlaylist:addToPlaylist,
        seekPlaylist:seekPlaylist,
        createPlaylist:createPlaylist,
        importAllPlaylists:importAllPlaylists,
        removePlaylist:removePlaylist,
        editPlaylist:editPlaylist,
        checkIsGift:checkIsGift,
        moodEnable:moodEnable,
        moodDisable:moodDisable
      
    };

    return service;
  }
})();
