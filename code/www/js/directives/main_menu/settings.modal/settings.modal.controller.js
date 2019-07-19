(function () {
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('settingsModalController', settingsModalController);

  settingsModalController.$inject = [
    'SettingsModal',
    '$scope',
    'userSettingsService',
    'settingIdentifier'

  ];

  function settingsModalController(
    SettingsModal,
    $scope,
    $q,
    userSettingsService,
    settingIdentifier
  ) {
    var sc = angular.extend(this, {

    });


    function changed(setting, index) {
      userSettingsService.set(setting.id, sc.settingItem[index]);
    }


    function asyncUpdateSettings(settings) {
      sc.settings = settings;
      var promises = [];
      var deferred = $q.defer();
      sc.settings.forEach(function (element) {

        // when the app is created, all user settings are at null.
        // we use userSettingsService.asyncGetNumUnset to tell if the user has visted the privacy settings yet.
        // when the settings dialog starts for the first time, it sets all user settings to their defaults
        promises.push(userSettingsService.asyncGet(element.id).then(
          function (value) {
            if (value == null) {
              element.value = element.default_value;
              userSettingsService.asyncSet(element.id.default_value);
            } else {
              element.value = value;
            }
          }
        ));

        $q.all(promiseArray).then(
          function (results) {
            deferred.resolve(sc.settings);
          }
        );
      }
      );
      return deferred.promise;
    }

    $scope.SettingsModal = SettingsModal;
    function init() {
      userSettingsService.asyncGetSupportedSettings().then(updateSettings);

    }
    init();
    sc.changed = changed;
  }
})();