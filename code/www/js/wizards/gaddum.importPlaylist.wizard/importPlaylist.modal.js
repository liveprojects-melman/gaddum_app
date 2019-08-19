(function () {
    'use strict';

    angular
        .module('gaddum.playlists')
        .factory('importPlaylistWizard', importPlaylistWizard);//rename genModal
    importPlaylistWizard.$inject = ['$ionicModal', '$rootScope' , '$timeout'];
    function importPlaylistWizard($ionicModal, $rootScope , $timeout) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'importPlaylistWizardController as mc',
                animation: 'slide-in-down'
                
            };
        $scope.$on("modal.hidden", function (modal) {
            
            close();
            
        });
        var modalSave = null;
        var parmeter = null;

        var myModal = {
            open: open,
            close: close,
            getParams:getParams,
            callback:callback
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;
            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/wizards/gaddum.importPlaylist.wizard/importPlaylist.modal.html',
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
        function callback(arrayPlaylist){
            $scope.fnCallbackOk(arrayPlaylist);
            close();
        }
        function close() {
            if (modalSave){
                $timeout(function(){
                    modalSave.remove();
                },500);
            }
            
        }
        function closeAndRemove(modalInstance) {
            return modalInstance.hide()
                .then(function () {
                    return modalInstance.remove();
                });
        };
    }
})();

