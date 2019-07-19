(function () {
    'use strict';

    angular
        .module('modalsProfile', [])
        .factory('profileEditModal', profileEditModal);
    profileEditModal.$inject = ['$ionicModal', '$rootScope'];
    function profileEditModal($ionicModal, $rootScope) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'profileEditModalController as vm',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            close();
            $scope.fnCallbackCancel();
        });
        var modalSave = null;
        var parmeter = null;

        var myModal = {
            open: open,
            close: close,
            getParams:getParams,
            callback:callback,
            cancel:cancel
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;

            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/directives/profileDirective/modals/profileEditModal.html',
                myModalInstanceOptions,
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
            modalSave.remove();
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

