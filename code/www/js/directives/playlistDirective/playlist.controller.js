(function () {
  'use strict';

  angular
    .module('gaddum.playlistDirective')
    .controller('playlistController', control);

  control.$inject = [
    '$state',
    'profileService',
    'profileEditModal',
    'gaddumContextMenuItem',
    'gaddumShortcutBarService',
    'gaddumMusicProviderService',
    'playlistService',
    '$ionicSlideBoxDelegate',
    'playlistViewModal',
    'importPlaylistWizard',
    'howAreYouModal',
    'MoodedPlaylist',
    'playlistCreateModal'
  ];

  function control(
    $state,
    profileService,
    profileEditModal,
    gaddumContextMenuItem,
    gaddumShortcutBarService,
    gaddumMusicProviderService,
    playlistService,
    $ionicSlideBoxDelegate,
    playlistViewModal,
    importPlaylistWizard,
    howAreYouModal,
    MoodedPlaylist,
    playlistCreateModal

  ) {
    var vm = angular.extend(this, {
      scrollGenre: true,
      genresFontStyle: false,
      firstSearch: true,
      playlistsToShow: {},
      busy: false,
      searchTerm: ""

    });
    var scale = 8;
    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };


    function init() {
      onNewSearch("");
      createModalList();
      if (playlistService.getIsBusy()) {
        vm.busy = true;
        contextMenuDisable();
      }
    };
    function createModalList() {
      var firstVariable = "Import Playlists";
      var firstFunc = importPlaylist;
      var secVariable = "Create Playlist";
      var secFunc = createPlaylist;
      var contextMenu = [];
      contextMenu[0] = gaddumContextMenuItem.build(firstVariable, firstFunc);
      contextMenu[1] = gaddumContextMenuItem.build(secVariable,secFunc);
      vm.conMenu = contextMenu;
      gaddumShortcutBarService.setContextMenu(vm.conMenu);
    }
    function contextMenuDisable() {
      gaddumShortcutBarService.disableContext();
    }
    function contextMenuEnable() {
      gaddumShortcutBarService.enableContext();
    }
    function createPlaylist(){
      playlistCreateModal.open(null,createRefresh,null);
    }
    function createRefresh(name){
      vm.busy = true;
      contextMenuDisable();
      if(name){
        playlistService.asyncCreatePlaylist(name).then(function(result){
          vm.busy = false;
          contextMenuEnable();
          onNewSearch("");
        });
      }
      else{
        vm.busy = false;
        contextMenuEnable();
      }
    }
    function importPlaylist() {
      importPlaylistWizard.open(null, importRefresh, null);
    }
    function importRefresh(playlistArray) {
      vm.busy = true;
      contextMenuDisable();
      playlistService.asyncImportPlaylist(playlistArray)
        .then(function (result) {
          vm.busy = false;
          contextMenuEnable();
          onNewSearch("");
        });
    }

    vm.removePlaylist = function (index) {
      vm.busy = true;
      contextMenuDisable();
      var playlist = vm.playlistsToShow[index];
      console.log("removing: " + playlist.getName());
      playlistService.asyncRemovePlaylist(playlist).then(
        function () {
          onNewSearch(vm.searchTerm);
          contextMenuEnable();
          vm.busy = false;
        },
        onError
      );


    }



    vm.viewPlaylist = function (index) {
      var playlist = vm.playlistsToShow[index];

      //modal
      //var viewedPlaylist=playlistService.getPlaylist(PlaylistToGet);
      console.log("Veiwing: ", playlist);
      playlistService.asyncGetPlaylistTracks(playlist).then(function (tracks) {
        console.log("tracks", tracks);
        var modalParams =
          { "playlist": playlist, "name": playlist.getName(), "tracks": tracks }
          /*  {"userGenres":userGenres},
           {"userProfile":profileService.getUserProfile()} */
          ;
        playlistViewModal.open(modalParams, vm.removePlaylist, refreshPlaylist);
      });
      //var,ok,c
    };

    var playlistToPlay = null;
    vm.playPlaylist = function (index) {
      playlistToPlay = vm.playlistsToShow[index];
      howAreYouPlay();
      console.log("playPlaylist: Not yet implemented...");
    }
    function howAreYouPlay() {
      howAreYouModal.open(null, fnCallbackHowAreYouOkPlay, fnCallbackHowAreYouCancel);
    }
    function fnCallbackHowAreYouOkPlay(emotion) {
      playlistService.asyncGetPlaylistTracks(playlistToPlay).then(function (tracks) {
        var mooded = null;
        var moodedArray = [];
        mooded = MoodedPlaylist.build(emotion, tracks);
        moodedArray.push(mooded);
        playlistService.asyncPlay(moodedArray);
        console.log(moodedArray);
      });
    }
    function fnCallbackHowAreYouCancel() {
      console.log("modal canceled");
    }

    function refreshPlaylist(tracks, playlist) {
      if (tracks && playlist) {
        console.log("refresh tracks", tracks);
        vm.busy = true;
        contextMenuDisable();
        playlistService.asyncSetPlaylistTracks(playlist, tracks).then(function () {
          onNewSearch("");
          vm.busy = false;
          contextMenuEnable();
        });
      }
      else {
        onNewSearch("");
        contextMenuEnable();
      }


    };





    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };




    // function getPlaylist() {

    //   gaddumMusicProviderService.importAllPlaylists().then(function (result) {
    //     var id = result.data.items[0].id

    //     gaddumMusicProviderService.getplaylistTracks(id).then(function (result2) {

    //       console.log("track", result2);
    //     }).catch(function (er) {

    //       console.log(er);
    //     });
    //   }).catch(function (er) {

    //     console.log(er);
    //   });


    // };

    // vm.searchColour = function () {
    //   document.getElementById('searchPlaylistsBox').style.color = "grey";
    // };

    // vm.searchClick = function () {
    //   if (vm.firstSearch) {
    //     document.getElementById('searchPlaylistsBox').value = "";
    //     document.getElementById('searchPlaylistsBox').style.color = "black";
    //     console.log("clicked");
    //     vm.firstSearch = false;
    //   };

    //   vm.searchDeselect = function () {
    //     if (document.getElementById('searchPlaylistsBox').value == "") {
    //       document.getElementById('searchPlaylistsBox').value = "search";
    //       document.getElementById('searchPlaylistsBox').style.color = "grey";
    //       vm.firstSearch = true;
    //       console.log("reactivated");
    //     }

    //   };
    // };


    function onNewPlaylists(playlists) {
      vm.busy = false;
      console.log("playlist", playlists);
      vm.playlistsToShow = playlists;
    }


    function onError(error) {
      vm.busy = false;
      contextMenuEnable();
      console.log("playlistController: " + error.message);
    }

    function onNewSearch(searchTerm) {
      vm.busy = true;
      vm.searchTerm = searchTerm;
      playlistService.asyncSeekPlaylists(searchTerm).then(
        onNewPlaylists,
        onError
      );
    }


    vm.searchPlaylists = function () {
      var searchTerm = document.getElementById("searchPlaylistsBox").value;

      onNewSearch(searchTerm);

    };

    init();

  }
})();