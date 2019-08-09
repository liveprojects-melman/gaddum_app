(function () {
    'use strict';

    angular
        .module('gaddum.permissions')
        .factory('permissionsListenerService', permissionsListenerService);

    permissionsListenerService.$inject = [

    ];
    function permissionsListenerService(

    ) {

        var fnOnAllPermissionsGranted = null;

        function controllerNotifyGranted(){
            if(fnOnAllPermissionsGranted){
                fnOnAllPermissionsGranted();
            }
        };
        
        function initialise(fnCallbackOnGranted){
            fnOnAllPermissionsGranted = fnCallbackOnGranted;
        };


        var  service = {
            // used by the controller handling the user's interactions with the permissions service
            controllerNotifyGranted: controllerNotifyGranted,
            // used by the main app to pass in a function which is called when the user has granted all permissions
            initialise: initialise
        };

        return service;
    }
})();
