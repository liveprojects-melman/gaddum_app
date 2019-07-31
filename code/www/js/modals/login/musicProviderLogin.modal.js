(function () {
    'use strict';

    angular
        .module('gaddum.login')
        .factory('loginModal', loginModal);
    loginModal.$inject = ['$ionicModal', '$rootScope', '$q', '$timeout','ErrorIdentifier'];
    function loginModal($ionicModal, $rootScope, $q, $timeout, ErrorIdentifier) {
        var $scope = $rootScope.$new(),
            myModalInstanceOptions = {
                scope: null,
                focusFirstInput: true,
                controller: 'loginModalController as mc',
                
            };
        $scope.$on("modal.hidden", function (modal) {
            
            onClickOff();
            
        });
        var modalSave = null;
        var parmeter = null;
        var isWorking = false;
        var loginSuccessful = false;
        var isClosing =  false;


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
            loginSuccessful = false;
            $scope.fnCallbackCancel();
            close();
        }

        function notifyLoginSuccess(){
            loginSuccessful = true;
            $scope.fnCallbackOk();
            close();
        }

        function getParams(){
            return parmeter;
        }

        function close() {
            isClosing = true; // we are closing the dialog
            isWorking = false;   // to anyone waiting, the operation is complete
            modalSave.remove();            
        }

        function onClickOff(){
            if(modalSave){
                if(!modalSave._isShown){
                    modalSave.remove();
                }
            }
            if(!isClosing){
                loginSuccessful = false;
                isWorking = false;
                $scope.fnCallbackCancel();
            }
        }


        function asyncWaitAndCheck(){
            var deferred = $q.defer();

            $timeout(function(){
                if(!isWorking){
                    
                    deferred.resolve();
                }else{
                    
                    deferred.reject();
                }
            },1000);

            return deferred.promise;
        }


        function asyncWaitUntilClosed() {
            
            var deferred = $q.defer();
          
            function doQuery() {
              console.log("waiting..");  
              asyncWaitAndCheck()
                .then(
                    function closed() {
                        console.log("login process completed.");
                        deferred.resolve();
                    },
                    function stillOpen(){
                        console.log("login ongoing...");
                        doQuery();
                    });
            }
            doQuery();
            return deferred.promise
        }

        function asyncWaitForLogin(){
            var deferred = $q.defer();
                asyncWaitUntilClosed().then(
                    function(){
                        if(loginSuccessful == true){
                            console.log("logged in.");
                            deferred.resolve(true);
                        }else{
                            console.log("login aborted.");
                            deferred.reject(ErrorIdentifier.build(ErrorIdentifier.NO_MUSIC_PROVIDER,"We waited while you tried to log in, but no joy."));
                        }
                    }
                );
            return deferred.promise;   
        }


        function asyncDoLogin(){
            var deferred = $q.defer();

            open(null, 
                function onOK(){
                    isWorking = false;
                    loginSuccessful = true;
                    deferred.resolve(true);
                },
                function onCancel(){
                    isWorking = false;
                    loginSuccessful = false;
                    deferred.reject(ErrorIdentifier.build(ErrorIdentifier.NO_MUSIC_PROVIDER,"Oh, no! We couldn't log you in!"));
                }
                );

            return deferred.promise;
        }

        function promiseLogin(){

            if(isWorking){
                return asyncWaitForLogin();
            }else{
                isWorking = true;
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

