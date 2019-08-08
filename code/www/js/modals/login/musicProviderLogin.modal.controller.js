(function () {
  'use strict';

  angular
    .module('gaddum.login')
    .controller('loginModalController', loginModalController);

  loginModalController.$inject = [
    'loginModal',
    'selectorModal',
    '$scope',
    'gaddumMusicProviderService',
    'MusicProviderIdentifier',
    '$q'

  ];

  function loginModalController(
    loginModal,
    selectorModal,
    $scope,
    gaddumMusicProviderService,
    MusicProviderIdentifier,
    $q
  ) {


    function onLoginSuccess() {
      ac.busy = false;
      loginModal.notifyLoginSuccess();
    }

    function onLoginFail() {
      ac.busy = false;
    }

    function cancelLogin() {
      loginModal.notifyLoginFail();
    }

    function asyncLogin() {
      ac.busy = true;
      gaddumMusicProviderService.asyncSetServiceProvider(ac.selectedNamedIdentifier)
        .then(
          function () {
            gaddumMusicProviderService.asyncLogin().then(
              onLoginSuccess,
              onLoginFail);
          },
          onLoginFail
        );
    }

    function onSelectorResult(selectedNamedIdentifier) {
      ac.selectedNamedIdentifier = selectedNamedIdentifier;
      ac.loginEnabled = true;
    }

    function onSelectorCancelled() {
      console.log("loginModalController.showSelector.callback.onCancel");
      ac.loginEnabled = false;
    }

    function asyncPopulateSelector() {
      var deferred = $q.defer();
      ac.busy = true;
      gaddumMusicProviderService.asyncGetSupportedMusicProviders().then(
        function (result) {
          ac.serviceProviders = result;
          ac.busy = false;
          deferred.resolve(result);
        },
        function (err) {
          ac.serviceProviders = [];
          ac.busy = false;
          deferred.reject()
        }
      );

      return deferred.promise;

    }



    function asyncShowSelector() {
      asyncPopulateSelector().then(function (result) {
        selectorModal.open(result, onSelectorResult, onSelectorCancelled);
      });

    }

    var ac = angular.extend(this, {
      // vars

      busy: false,
      loginEnabled: false,
      namedIdentifiers: [],
      selectedNamedIdentifier: {},
      // funcs
      asyncLogin: asyncLogin,
      asyncShowSelector: asyncShowSelector,
      cancelLogin: cancelLogin
    });




    $scope.loginModal = loginModal;

    function init() {
      ac.busy = true;
      ac.loginEnabled = false;
      ac.selectedNamedIdentifier = MusicProviderIdentifier.build("Select ...", "");
    }
    init();

  }
})();