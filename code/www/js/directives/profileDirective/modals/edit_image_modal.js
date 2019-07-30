(function () {
    'use strict';

    angular
        .module('editImageModalModule', [])
        .factory('editImageModal', editImageModal);
        editImageModal.$inject = ['$ionicModal', '$rootScope'];
    function editImageModal($ionicModal, $rootScope) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'editImageModalController as vm',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            close();
            
        });
        var modalSave = null;
        var parmeter = null;
        var encodedImage=[];

        var myModal = {
            open: open,
            close: close,
            getParams:getParams,
            callback:callback,
            cancel:cancel,
            imgUpdate:imgUpdate
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;

            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/directives/profileDirective/modals/editImageModal.html',
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
                modalSave.remove();
                $scope.fnCallbackCancel(encodedImage);
            }
            
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

        function imgUpdate(modalImage){
            encodedImage=modalImage;
        };

        function cancel(){
            $scope.fnCallbackCancel();
        };
    }
})();

