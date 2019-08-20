(function () {
    'use strict';

    angular
        .module('playlistCreateModule', [])
        .factory('playlistCreateModal', playlistCreateModal);
        playlistCreateModal.$inject = ['$ionicModal', '$rootScope' , '$timeout'];
    function playlistCreateModal($ionicModal, $rootScope , $timeout) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'playlistCreateModalController as vm',

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
                'js/modals/playlist.create.modal/playlistCreateModal.html',
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
        function callback(playlistName) {
            $scope.fnCallbackOk(playlistName);
            close();
        };
        function cancel(){
            $scope.fnCallbackOk(null);
            close();
        }


    }
})();

