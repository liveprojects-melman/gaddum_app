(function () {
    'use strict';

    angular
        .module('utilitiesjs')
        .factory('dialogsSrvc', dialogsSrvc);

    dialogsSrvc.$inject = [
        '$ionicPopup'
    ];

    function dialogsSrvc(
        $ionicPopup
    ) {

        var service = {
            NO: 0,
            YES: 1,
            CANCEL: 0,
            OK: 1,
            selfAbort: {
                create: null

            },
            fatalError: {
                create: null
            },
            removeLocal: {
                create: null
            },
            removeRemote: {
                create: null
            },
            message:{
                create: null
            }

        };

        service.selfAbort.create = function (scope) {
            return $ionicPopup.show(

                {
                    title: "Leaving the App?",
                    template: "Just confirming you want to leave:",
                    scope: scope,
                    buttons: [
                        {
                            text: '<b>Yes, Leave</b>',
                            type: 'button-assertive',
                            onTap:
                            function () {
                                return service.YES;
                            }
                        },
                        {
                            text: '<b>No, Stay</b>',
                            type: 'button-calm',
                            onTap:
                            function () {
                                return service.NO;
                            }
                        }
                    ]
                }
            );
        };


        service.removeLocal.create = function (scope) {
            return $ionicPopup.show(

                {
                    title: "Remove your local data?",
                    template: "Please confirm you want to remove your course history from this device.",
                    scope: scope,
                    buttons: [
                        {
                            text: '<b>Yes, DELETE</b>',
                            type: 'button-assertive',
                            onTap:
                            function () {
                                return service.YES;
                            }
                        },
                        {
                            text: '<b>No</b>',
                            type: 'button-calm',
                            onTap:
                            function () {
                                return service.NO;
                            }
                        }
                    ]
                }
            );
        };

        service.removeRemote.create = function (scope) {
            return $ionicPopup.show(

                {
                    title: "Remove from the cloud?",
                    template: "Please confirm you want to remove this course's history from the cloud.",
                    scope: scope,
                    buttons: [
                        {
                            text: '<b>Yes, DELETE</b>',
                            type: 'button-assertive',
                            onTap:
                            function () {
                                return service.YES;
                            }
                        },
                        {
                            text: '<b>No</b>',
                            type: 'button-calm',
                            onTap:
                            function () {
                                return service.NO;
                            }
                        }
                    ]
                }
            );
        };

        service.message.create = function (title, message, scope) {
            return $ionicPopup.show(

                {
                    title: title,
                    template: message,
                    scope: scope,
                    buttons: [
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive',
                            onTap:
                            function () {
                                return service.OK;
                            }
                        }
                    ]
                }
            );
        };




        service.fatalError.create = function (error,scope) {
            return $ionicPopup.show(

                {
                    title: "Sorry - We messed up.",
                    subTitle: "We have to end the app. In case it helps, we had the following error: '" + error + "'",
                    scope: scope,
                    buttons: [
                        {
                            text: '<b>OK</b>',
                            type: 'button-assertive',
                            onTap:
                            function () {
                                return service.OK;
                            }
                        }
                    ]
                }
            );
        };
        return service;
    }
})();






