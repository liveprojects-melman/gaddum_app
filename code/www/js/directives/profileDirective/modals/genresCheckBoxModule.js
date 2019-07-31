(function () {
    'use strict';

  angular
    .module('genresCheckboxModalsModule', [])
    .factory('genresCheckboxModal', genresCheckboxModal);
  genresCheckboxModal.$inject = ['$ionicModal', '$rootScope'];
  function genresCheckboxModal($ionicModal, $rootScope) {
    var $scope = $rootScope.$new(),
        myModalInstanceOptions = {
          scope: null,
          focusFirstInput: true,
          controller: 'genresCheckboxModalController as vm',
        };
    $scope.$on("modal.hidden", function (modal) {
      close();
    });
    var modalSave = null;
    var parmeter = null;
    var closeCheck = null;
    var selectedGenres=null;
    var myModal = {
      open: open,
      close: close,
      getParams:getParams,
      callback:callback,
      cancel:cancel,
      closeCheckFalse:closeCheckFalse,
      setGenre:setGenre
    };
    return myModal;

    function open(params, fnCallbackOk, fnCallbackCancel) {
      var service = this;
      closeCheck=true;
      parmeter = params;
      $scope.fnCallbackOk = fnCallbackOk;
      $scope.fnCallbackCancel=fnCallbackCancel;
      $ionicModal.fromTemplateUrl(
        'js/directives/profileDirective/modals/genresCheckBoxModal.html',
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
    function setGenre(genres){
      selectedGenres = genres;
    }
    function close() {
      
      if (modalSave){
                if(!modalSave._isShown){
                    modalSave.remove();
                    $scope.fnCallbackCancel(selectedGenres);
                }
            }
    }
    function closeCheckFalse(){
      closeCheck = false;
    }
    function closeAndRemove(modalInstance) {
      return modalInstance.hide()
        .then(function () {
          return modalInstance.remove();
        });
    };

    function callback(newData){
      $scope.fnCallbackOk(newData);
    }

    function cancel(){
      $scope.fnCallbackCancel();
    };
  }
})();

