(function () {
    'use strict';

    angular
        .module('app.db')
        .factory('firstTimeSrvc', firstTimeSrvc);

    firstTimeSrvc.$inject = [
        '$q',
        '$timeout',
        'storage'
    ];

    function firstTimeSrvc(
        $q,
        $timeout,
        storage
    ) {

        var service = {
            BREAD_CRUMB_KEY: "breadcrumb",

            private: {
                firstTime: true,
            }
        };

        //PUBLIC
        service.isFirstTime = function () {
            if (service.private.firstTime == true) {
                var breadcrumb = storage.getItem(service.BREAD_CRUMB_KEY);
                if (breadcrumb) {
                    service.private.firstTime = false;
                }
            }
            return service.private.firstTime;
        }

        //PUBLIC
        service.setFirstTime = function () {
            service.private.firstTime = true;
            storage.removeItem(service.BREAD_CRUMB_KEY);
            return service.private.firstTime;
        }

        //PUBLIC
        service.clearFirstTime = function () {
            service.private.firstTime = false;
            storage.setItem(service.BREAD_CRUMB_KEY, "breadcrumb!");
            return service.private.firstTime;
        }

 
        service.isFirstTime();
        return service;
    }
})();






