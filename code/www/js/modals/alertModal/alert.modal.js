(function () {
    'use strict';

    angular
        .module('gaddum.alert')
        .factory('alertModal', alertModal);
    alertModal.$inject = ['$ionicModal', '$rootScope', '$q', '$timeout', 'ErrorIdentifier'];
    function alertModal($ionicModal, $rootScope, $q, $timeout, ErrorIdentifier) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'alertModalController as mc',

            };
        $scope.$on("modal.hidden", function (modal) {

            close();

        });
        var modalSave = null;
        var parmeter = null;
        var isClosing = false;


        function open(params, fnCallbackOk, fnCallbackCancel) {


            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel = fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/modals/alertModal/alert.modal.html',
                myModalInstanceOptions
            ).then(function (modalInstance) {
                modalSave = modalInstance;


                return modalInstance.show();
            });

        }

        function getParams() {
            return parmeter;
        }

        function close() {
            if (modalSave) {
                if (!modalSave._isShown) {
                    $timeout(function(){
                        modalSave.remove();
                    },500);
                }
            }
        }


        var myModal = {
            open: open,
            close: close,
            getParams: getParams
        };
        return myModal;

    }
})();

