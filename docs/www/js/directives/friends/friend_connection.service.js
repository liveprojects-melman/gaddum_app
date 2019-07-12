(function () {
    'use strict';

    angular
        .module('gaddum.friends')
        .factory('friend_connectionService', friend_connectionService);

        friend_connectionService.$inject = [
        /* '$cordovaNetwork' */
    ];

    function friend_connectionService(
        /* $cordovaNetwork // from ngCordova: http://ngcordova.com/docs/plugins/network/ */
    ) {

        var service = {
               
        };

        service.connect_friend=function(UUID){
            var encryptionkey=false;
            var success=false;
            if (UUID!=null) {
                //get encryption key from service
                encryptionkey=true;
                success=true;
            }
            return success;
        }

        return service;
    }
})();






