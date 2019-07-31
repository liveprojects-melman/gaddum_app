(function () {
    'use strict';

    angular
        .module('gaddum.login')
        .factory('loginModal', loginModal);
    loginModal.$inject = ['$ionicModal', '$rootScope', '$q', 'ErrorIdentifier'];
    function loginModal($ionicModal, $rootScope, $q, ErrorIdentifier) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'loginModalController as mc',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            
            close();
            
        });
        var modalSave = null;
        var parmeter = null;
        var isOpen = false;
        var lastAttempt = false;



        function open(params, fnCallbackOk, fnCallbackCancel) {


            parmeter = params;
            $scope.fnCallbackOk = fnCallbackOk;
            $scope.fnCallbackCancel=fnCallbackCancel;
            $ionicModal.fromTemplateUrl(
                'js/modals/login/musicProviderLogin.modal.html',
                myModalInstanceOptions
            ).then(function (modalInstance) {
                modalSave = modalInstance;
  
                
                return modalInstance.show();
            });
            
        }

        function notifyLoginFail(){
            lastAttempt = false;
            $scope.fnCallbackCancel();
            close();
        }

        function notifyLoginSuccess(){
            lastAttempt = true;
            $scope.fnCallbackOk();
            close();
        }

        function getParams(){
            return parmeter;
        }

        function close() {
            if(modalSave){
                if(!modalSave._isShown){
                    modalSave.remove();
                }
                
            }
            isOpen = false;
        }



        function waitFor(condition, callback) {
            if(!condition()) {
                console.log('waiting');
                window.setTimeout(waitFor.bind(null, condition, callback), 1000); /* this checks the flag every 100 milliseconds*/
            } else {
                console.log('done');
                callback();
            }
        }

        function isClosed(){
            return !isOpen;
        }

        function asyncWaitUntilClosed(){
            var deferred = $q.defer();

            waitFor(isClosed, function(){
                if(lastAttempt == true){
                    deferred.resolve(true);
                }else{
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.NO_MUSIC_PROVIDER,"We waited while you tried to log in, but no joy."));
                }
            })

            return deferred.promise;
        }



        function asyncDoLogin(){
            var deferred = $q.defer();

            open(null, 
                function onOK(){
                    isOpen = false;
                    lastAttempt = true;
                    deferred.resolve(true);
                },
                function onCancel(){
                    isOpen = false;
                    lastAttempt = false;
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.NO_MUSIC_PROVIDER,"Oh, no! We couldn't log you in!"));
                }
                );

            return deferred.promise;
        }


        function promiseLogin(){

            if(isOpen){
                return asyncWaitUntilClosed();
            }else{
                isOpen = true;
                return asyncDoLogin();
            }




        }

        var myModal = {
            open: open,
            close: close,
            getParams:getParams,
            promiseLogin: promiseLogin,
            notifyLoginFail: notifyLoginFail,
            notifyLoginSuccess: notifyLoginSuccess

        
        };
        return myModal;

    }
})();

