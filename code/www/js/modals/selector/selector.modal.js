(function () {
    'use strict';

    angular
        .module('gaddum.selector')
        .factory('selectorModal', selectorModal);//rename genModal
    selectorModal.$inject = ['$ionicModal', '$rootScope'];
    function selectorModal($ionicModal, $rootScope) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'selectorModalController as mc',
                animation: 'slide-in-down'
                
            };
        $scope.$on("modal.hidden", function (modal) {
            
            onClickOff();
            
        });
        var modalSave = null;
        var parmeter = null;

        var myModal = {
            open: open,
            close: close,
            isClosing: false,
            getParams:getParams,
            callback:callback
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/modals/selector/selector.modal.html',
                myModalInstanceOptions
            ).then(function (modalInstance) {
                modalSave = modalInstance;
                return modalInstance.show();
            });
            
        }
        function getParams(){
            return parmeter;
        }
        function callback(namedIdentifier){
            close();
            $scope.fnCallbackOk(namedIdentifier);
            
        }
        function close() {
            myModal.isClosing = true; 
            modalSave.remove();
        }
        function onClickOff(){
            if(modalSave){
                if(!modalSave._isShown){
                    modalSave.remove();
                }
            }
            if(!myModal.isClosing){
                $scope.fnCallbackCancel();
            }
        }
        
    }
})();

