import { resolve } from "dns";
import { rejects } from "assert";

(function () {
    'use strict';

    angular
        .module('gaddum.observer')
        .factory('observer', observer);

    observer.$inject = [
        'ErrorIdentifier',
        'GenericTrack',
        'MoodedPlaylist',
        'StatementCriteria',
        'dataApiService',
        '$timeout'

    ];

    function observer(
        ErrorIdentifier,
        GenericTrack,
        MoodedPlaylist,
        StatementCriteria,
        dataApiService,
        $timeout
    ) {




        function initialise(){

        } 






        var service = {
            initialise : initialise

        };

        return service;
    }





})();