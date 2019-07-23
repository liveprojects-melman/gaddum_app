(function () {
    'use strict';
  
    angular
      .module('gaddum.shortcutBar')
      .controller('gaddumShortcutBarController', gaddumShortcutBarController);
  
      gaddumShortcutBarController.$inject = [
      'gaddumShortcutBarService'
    ];
  
    function gaddumShortcutBarController(
        gaddumShortcutBarService
    ) {
        var sc = angular.extend(this, {
            contextReady: false
        });
        
      function shortcutShare(){
          console.log("calls the Share modal");
      }
      function shortcutAddToPlaylist(){
        
        console.log("calls the add to Playlist modal");
    }
    function shortcutContextMenu(){
        if(sc.contextReady){
            gaddumShortcutBarService.showShortcutMenuModal();
        }
            
        
    }
    function fnCallBack(){
        sc.contextReady =gaddumShortcutBarService.hasMenu();
    }
    function init(){
        gaddumShortcutBarService.registerContextMenuReadyCallback(fnCallBack)
    }
    init();
        sc.shortcutContextMenu=shortcutContextMenu;
        sc.shortcutAddToPlaylist= shortcutAddToPlaylist;
        sc.shortcutShare = shortcutShare;
    }
  })();
  