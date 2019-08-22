(function () {
    'use strict';

    angular
        .module('gaddum.main_ui')
        .factory('mainMenuModal', mainMenuModal);//rename genModal
    mainMenuModal.$inject = ['$ionicModal', '$rootScope' , '$timeout'];
    function mainMenuModal($ionicModal, $rootScope, $timeout) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'mainMenuModalController as mc',
                animation: " slide-in-down"
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
                'js/directives/main_menu/main_menu.modal/main_menu.modal.html',
                myModalInstanceOptions
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
            if (modalSave){
                if(!modalSave._isShown){
                    $timeout(function(){
                        modalSave.remove();
                        modalSave = null;
                        $scope.fnCallbackCancel();
                    },500);
                }
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

