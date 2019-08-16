(function () {
    'use strict';

    angular
        .module('gaddum.searchCat' ,[])
        .factory('searchCatModal', searchCatModal);//rename genModal
        searchCatModal.$inject = ['$ionicModal', '$rootScope'];
    function searchCatModal($ionicModal, $rootScope) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'searchCarModalController as mc',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            
            close();
            
        });
        var modalSave = null;
        var parmeter = null;
        var chose = {};
        var myModal = {
            open: open,
            close: close,
            getParams:getParams,
            chosen:chosen
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;

            parmeter = params;
            chose = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/directives/browse/searchCat.modal/searchCat.modal.html',
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
        function chosen(type){
            chose = type;
        }
        function close() {
            if (modalSave){
                if(!modalSave._isShown){
                    modalSave.remove();
                    modalSave = null;
                    $scope.fnCallbackCancel(chose);
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

