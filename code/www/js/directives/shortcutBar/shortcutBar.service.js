(function () {
    'use strict;'
  
    angular
      .module('gaddum.shortcutBar')
      .factory('gaddumShortcutBarService', gaddumShortcutBarService)
      ;
  
      gaddumShortcutBarService.$inject = [
      'gaddumContextMenuModal'
    ];
    function gaddumShortcutBarService(
        gaddumContextMenuModal
    ) {
        var modalList= [];
        var shortcutCallBack = null;
        function registerContextMenuReadyCallback(fnCallback){
            shortcutCallBack = fnCallback;
        }
        function showShortcutMenuModal(){
            console.log("show", modalList);
            gaddumContextMenuModal.open(modalList,fnCallbackOk,fnCallbackCancel);
            
        }
        function fnCallbackOk(){
            console.log("modal ok");
          }
          function fnCallbackCancel(){
            console.log("modal cancel");
          }
        function setContextMenu(list){
            modalList= list;
            console.log(modalList);
            if(shortcutCallBack){
                shortcutCallBack();
            }
        }
        function hasMenu(){
            return (modalList != null);
        }
        function clearContextMenu(){
            modalList = null;
            if(shortcutCallBack){
                console.log("list");
                shortcutCallBack();
            }
        }
        var service = {
            hasMenu:hasMenu,
            registerContextMenuReadyCallback:registerContextMenuReadyCallback,
            showShortcutMenuModal:showShortcutMenuModal,
            setContextMenu:setContextMenu,
            clearContextMenu:clearContextMenu
          };
          return service;
      
    }
  })();
  