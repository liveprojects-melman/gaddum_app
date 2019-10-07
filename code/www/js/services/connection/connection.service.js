(function () {
    'use strict';

    angular
        .module('gaddum.connection')
        .factory('connectionService', connectionService);

    connectionService.$inject = [
        
    ];

    function connectionService(
 
    ) {

        var gFnOnChange = null;



        function notifyChange(){
            if(gFnOnChange){
                gFnOnChange();
            }
        }

        function initialise(fnOnChange){
            gFnOnChange = fnOnChange;

            document.addEventListener("online", notifyChange, false);
            document.addEventListener("offline", notifyChange, false);
       }

        function hasConnection(){
            var result = true;

            var connection =  navigator.connection.type;
            result =  !(connection.valueOf() == Connection.NONE.valueOf());
            return result;
        }

        function isWifi(){
            var result = true;
            var connection =  navigator.connection.type;
            result =  (connection.valueOf() == Connection.WIFI.valueOf());
            return result;
        }


        var service = {
            initialise: initialise,
            isWifi: isWifi,
            hasConnection: hasConnection       
        };


        return service;
    }
})();






