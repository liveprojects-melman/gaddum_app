(function () {
    'use strict';

    angular
        .module('playlistEditModule', [])
        .factory('playlistEditModal', playlistEditModal);
    playlistEditModal.$inject = ['$ionicModal', '$rootScope'];
    function playlistEditModal($ionicModal, $rootScope) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'playlistEditModalController as vm',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            close();
            
        });
        var modalSave = null;
        var parmeter = null;
        var closeCheck = null;

        var myModal = {
            open: open,
            close: close,
            getParams:getParams,
            callback:callback,
            cancel:cancel,
            closeCheckFalse:closeCheckFalse
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;
            closeCheck=true;
            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/modals/playlist.edit.modal/playlistEditModal.html',
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
            if(modalSave){
                if(modalSave._isShown){
                    modalSave.remove();
                    $scope.fnCallbackCancel();
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

        function callback(newData){
            $scope.fnCallbackOk(newData);
        };

        function cancel(){
            $scope.fnCallbackCancel();
        };
    }
})();

