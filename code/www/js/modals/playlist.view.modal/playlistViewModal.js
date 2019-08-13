(function () {
    'use strict';

    angular
        .module('playlistViewModule', [])
        .factory('playlistViewModal', playlistViewModal);
    playlistViewModal.$inject = ['$ionicModal', '$rootScope'];
    function playlistViewModal($ionicModal, $rootScope) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'playlistViewModalController as vm',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            close();
            
        });
        var modalSave = null;
        var parmeter = null;
        var closeCheck = null;
        var dataTracks = null;
        var dataPlaylist= null;

        var myModal = {
            open: open,
            close: close,
            getParams:getParams,
            callback:callback,
            cancel:cancel,
            closeCheckFalse:closeCheckFalse,
            data:data
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;
            closeCheck=true;
            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/modals/playlist.view.modal/playlistViewModal.html',
                myModalInstanceOptions
            ).then(function (modalInstance) {
                modalSave = modalInstance;
                service.close = function () {
                    closeAndRemove(modalInstance);
                    
                };
                service.modalInstance = modalInstance;
                return service.modalInstance.show();
            });
            
        }
        function getParams(){
            return parmeter;

            
        }
        function close() {
            if(closeCheck){
                if(modalSave){
                    modalSave.remove();
                    $scope.fnCallbackCancel(dataTracks,dataPlaylist);
                }
            }
            closeCheck = true;
        }
        function closeCheckFalse(){
            closeCheck = false;
        }
        function closeAndRemove(modalInstance) {
            return modalInstance.hide()
                .then(function () {
                    return modalInstance.remove();
                });
        };
        function data(tracks,playlist){
            dataPlaylist = playlist;
            dataTracks = tracks;
        }
        function callback(newData){
            $scope.fnCallbackOk(newData);
        };

        function cancel(){
            $scope.fnCallbackCancel();
        };
    }
})();

