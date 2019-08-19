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
                controller: 'playlistEditModalController as vm',

            };
        $scope.$on("modal.hidden", function (modal) {

            close();

        });
        var modalSave = null;
        var parmeter = null;
        var trackList = null;
        var playlistName = null;

        var myModal = {
            open: open,
            close: close,
            getParams: getParams,
            callback: callback,
            trackData: trackData,
            nameData: nameData,
            cancel:cancel
        };
        return myModal;

        function open(params, fnCallbackOk, fnCallbackCancel) {
            var service = this;
            parmeter = params;
            trackList = null;
            playlistName = null;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel = fnCallbackCancel;
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
        function getParams() {
            return parmeter;


        }
        function close() {
            if (modalSave) {
                $timeout(function(){
                    modalSave.remove();
                    modalSave = null;
                    trackList = null;
                    playlistName = null;
                },500);
            }
        }
        function closeAndRemove(modalInstance) {
            return modalInstance.hide()
                .then(function () {
                    return modalInstance.remove();
                });
        };
        function trackData(tracks) {
            trackList = tracks;
        }
        function nameData(name) {
            playlistName = name;
        }
        function callback() {
            $scope.fnCallbackOk(trackList, playlistName);
            close();
        };
        function cancel(){
            $scope.fnCallbackOk(null, null);
            close();
        }


    }
})();

