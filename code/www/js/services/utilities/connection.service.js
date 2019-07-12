(function () {
    'use strict';

    angular
        .module('utilitiesjs')
        .factory('connectionSrvc', connectionSrvc);

    connectionSrvc.$inject = [
        '$cordovaNetwork'
    ];

    function connectionSrvc(
        $cordovaNetwork // from ngCordova: http://ngcordova.com/docs/plugins/network/
    ) {

        var service = {
               
        };

        service.hasConnection = function(){
            var result = true;
            var connection =  $cordovaNetwork.getNetwork();  
            result =  !(connection.valueOf() == Connection.NONE.valueOf());


          //  result = true;


            return result;
        }

        service.isWifi = function(){
            var result = true;
            var connection = $cordovaNetwork.getNetwork(); 
            result =  (connection.valueOf() == Connection.WIFI.valueOf());


         //   result = false;

            return result;
        }


        return service;
    }
})();






