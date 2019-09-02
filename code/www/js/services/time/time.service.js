(function () {
    'use strict';

    angular
        .module('gaddum.time')
        .factory('timeService', timeService);

    timeService.$inject = [
        '$q',
        'ErrorIdentifier',
        'dataApiService',
        '$timeout',
        'moment',
        'TimeSlot',
        'TimeStamp'

    ];

    function timeService(
        $q,
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
            dataApiService.asyncGetSupportedTimeSlots().then(
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
                    deferred.reject(err);
                }
            );

            return deferred.promise;
        }


        function findTimeSlot(timeStamp) {

            if (!m_timeslots) {
                throw ("timeService: not initialised.")
            }

            if(timeStamp == null){
                timeStamp = TimeStamp.build();
            }else{
                if(!(timeStamp instanceof TimeStamp)){
                    throw("timeService.findTimeSlot: needs a TimeStamp.");
                }
            }


            var candidate = moment(timeStamp.getJavaEpocMs()).toDate();


            var result = -1;

            for (var index = 0; index < m_timeslots.length; index++) {
                var timeslot = m_timeslots[index];

                if (timeslot.isDateWithinTimeSlot(candidate)) {
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
            return findTimeSlot(TimeStamp.build());
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