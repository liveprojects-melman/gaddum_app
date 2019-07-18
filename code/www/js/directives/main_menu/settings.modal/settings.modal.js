(function () {
    'use strict';
    
    angular
        .module('gaddum.main_ui')
        .factory('SettingsModal', SettingsModal);//rename genModal
    SettingsModal.$inject = ['$ionicModal', '$rootScope'];
    function SettingsModal($ionicModal, $rootScope) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'settingsModalController as sc',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            
            close();
            
        });
        var modalSave = null;
        var parmeter = null;

        var myModal = {
            open: open,
            close: close,
            getParams:getParams
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;

            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/directives/main_menu/settings.modal/settings.modal.html',
                myModalInstanceOptions,
            ).then(function (modalInstance) {
                modalSave = modalInstance;
                service.close = function () {
                    closeAndRemove(modalInstance);
                    $scope.fnCallbackOk();
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
                modalSave.remove();
                $scope.fnCallbackCancel();
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

