(function(){
  'use strict';

  angular
    .module('gaddum.playlists')
    .controller('playlistsListController', playlistsListController);

  playlistsListController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    'playlistsService',
    'gaddumContextMenuItem',
    'importPlaylistWizard',
    'gaddumShortcutBarService'
  ];

  function playlistsListController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    playlistsService,
    gaddumContextMenuItem,
    importPlaylistWizard,
    gaddumShortcutBarService
  ) {
    var vm = angular.extend(this, {

    });

    // attaching these methods to ng-mousedown/up on ion-items
    // makes swiping the item not cause the slidebox to move
    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };

    vm.groupsList = playlistsService.playlistsList;

    function init() {
          createModalList();
          gaddumShortcutBarService.setContextMenu(vm.conMenu);


          /* setInterval(function() {
              vm.genreScrollChecker();
          }, 100); */
      };
      init();
      function createModalList() {
            var firstVariable = "Import Playlists";
            var firstFunc = importPlaylist; 
            var contextMenu = [];
            contextMenu[0]=gaddumContextMenuItem.build(firstVariable,firstFunc);
            vm.conMenu = contextMenu;
            console.log(vm.conMenu);
        }
        function importPlaylist(){
          importPlaylistWizard.open(null,null,null);
        }

  }
})();
