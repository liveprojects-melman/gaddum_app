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
    'playlistCreateModal',
    'spinnerService',
    '$ionicListDelegate',
    '$timeout'
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
    playlistCreateModal,
    spinnerService,
    $ionicListDelegate,
    $timeout

  ) {
    var vm = angular.extend(this, {
      scrollGenre: true,
      genresFontStyle: false,
      firstSearch: true,
      playlistsToShow: {},
      busy: false,
      searchTerm: "",
      bang:false,
      throbbing:false,
      hasTracks:true

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
      vm.bang = true;
      $timeout(function(){
        vm.throbbing = true;
      },500);
      spinnerService.spinnerOn();
      contextMenuDisable();
      playlistService.asyncImportPlaylist(playlistArray)
        .then(function (result) {
          vm.busy = false;
          var explosion = document.getElementById("imExplosion");
          vm.throbbing = false;
          explosion.classList.add("moodExplosionLeave");
          $timeout(function(){
            vm.bang =false;
            explosion.classList.remove("moodExplosionLeave");
          },250);
          spinnerService.spinnerOff();
          contextMenuEnable();
          onNewSearch("");
        });
    }

    vm.removePlaylist = function (index) {
      $ionicListDelegate.closeOptionButtons();
      vm.busy = true;
      contextMenuDisable();
      var playlist = vm.playlistsToShow[index];
      playlistService.asyncRemovePlaylist(playlist).then(
        function () {
          onNewSearch(vm.searchTerm);
          contextMenuEnable();
          vm.busy = false;
        },
        onError
      );
    };

    vm.viewPlaylist = function (index) {
      var playlist = vm.playlistsToShow[index];
      $ionicListDelegate.closeOptionButtons();

      //modal
      playlistService.asyncGetPlaylistTracks(playlist).then(function (tracks) {
        var modalParams =
          { "playlist": playlist, "name": playlist.getName(), "tracks": tracks };
        playlistViewModal.open(modalParams, vm.removePlaylist, refreshPlaylist);
      });
    };

    var playlistToPlay = null;
    vm.playPlaylist = function (index) {
      $ionicListDelegate.closeOptionButtons();
      playlistToPlay = vm.playlistsToShow[index];
      howAreYouPlay();
    };

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
      });
    }

    function fnCallbackHowAreYouCancel() {
      // thanks!
    }

    function refreshPlaylist(tracks, playlist) {
      if (tracks && playlist) {
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

    function onNewPlaylists(playlists) {
      vm.busy = false;
      vm.playlistsToShow = playlists;
      if(vm.playlistsToShow[0]){
        vm.hasTracks=true;
      }
      else{
        vm.hasTracks=false;
      }
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
      $('#searchPlaylistsBox').blur();
      onNewSearch(searchTerm);
    };

    init();
  }
})();
