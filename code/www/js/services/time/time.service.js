(function () {
    'use strict';

    angular
        .module('gaddum.time')
        .factory('timeService', timeService);

    timeService.$inject = [
        'ErrorIdentifier',
        'dataApiService',
        '$timeout',
        'moment',
        'TimeSlot',
        'TimeStamp'

    ];

    function timeService(
        ErrorIdentifier,
        dataApiService,
        $timeout,
        moment,
        TimeSlot,
        TimeStamp
    ) {

        var m_timeslots = [];


        function asyncInitialise() {
            var deferred = $q.defer();
            dataApiService.getSupportedTimeSlots().then(
                function success(candidates) {
                    var result = [];
                    try {
                        candidates.forEach(
                            function (candidate) {
                                result.push(TimeSlot.buildFromObject(candidate));
                            });
                    } catch (e) {
                        fnFail(e);
                    }
                    m_timeslots = result;

                    deferred.resolve();
                },
                function error(err) {
                    m_timeslots = [];
                    deferred.reject[err];
                }
            );

            return deferred.promise;
        }


        function findTimeSlot(timeAsDate) {

            if (!m_timeslots) {
                throw ("timeService: not initialised.")
            }

            var candidate = moment(timeAsDate).asHours();
            var result = -1;

            for (var index = 0; index < m_timeslots.length; index++) {
                var timeslot = m_timeslots[index];

                if (timeslot.isDateWithinTimeslot(candidate)) {
                    result = timeslot.id;
                    break;
                }

            }

            if (result < 0) {
                throw ("timeslots are ill-defined.");
            }

            return result;

        }


        function getCurrentTimeSlot(){
            return findTimeSlot(new Date());
        }

        function getTimeStamp(date){
            return TimeStamp.build(date)
        }

        var service = {
            asyncInitialise: asyncInitialise,
            findTimeSlot: findTimeSlot,
            getCurrentTimeSlot: getCurrentTimeSlot,
            getTimeStamp:getTimeStamp 
        };

        return service;
    }





})();