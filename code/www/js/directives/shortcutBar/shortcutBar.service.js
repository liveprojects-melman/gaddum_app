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
        var disable = false;
        var shortcutCallBack = null;
        function registerContextMenuReadyCallback(fnCallback){
            shortcutCallBack = fnCallback;
        }
        function showShortcutMenuModal(){
//            console.log("show", modalList);
            gaddumContextMenuModal.open(modalList,fnCallbackOk,fnCallbackCancel);
        }
        function fnCallbackOk(){
//            console.log("modal ok");
          }
          function fnCallbackCancel(){
//            console.log("modal cancel");
          }
        function setContextMenu(list){
            modalList= list;
            disable = false;
//            console.log(modalList);
            if(shortcutCallBack){
                shortcutCallBack();
            }
        }
        function hasMenu(){
            if(!disable){
                return (modalList != null);
            }
            else{
                return false;
            }
        }
        function clearContextMenu(){
            modalList = null;
            disable= true;
            if(shortcutCallBack){
//                console.log("list");
                shortcutCallBack();
            }
        }
        function disableContext(){
            disable = true;
            if(shortcutCallBack){
//                console.log("list");
                shortcutCallBack();
            }
        }
        function enableContext(){
            disable = false;
            if(shortcutCallBack){
//                console.log("list");
                shortcutCallBack();
            }
        }
        var service = {
            hasMenu:hasMenu,
            registerContextMenuReadyCallback:registerContextMenuReadyCallback,
            showShortcutMenuModal:showShortcutMenuModal,
            setContextMenu:setContextMenu,
            clearContextMenu:clearContextMenu,
            enableContext:enableContext,
            disableContext:disableContext
          };
          return service;
    }
  })();
