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

    var DEFAULT_SELECTED_NAMED_IDENTIFIER = MusicProviderIdentifier.build("Select ...", "");
  

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

      console.log("setting music provider.");
      gaddumMusicProviderService.asyncSetMusicProvider(ac.selectedNamedIdentifier)
        .then(
          function () {
            console.log("requesting login.");
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

      ac.selectedNamedIdentifier = gaddumMusicProviderService.getMusicProvider();
      ac.loginEnabled = false;

      if(!ac.selectedNamedIdentifier){
        ac.selectedNamedIdentifier = DEFAULT_SELECTED_NAMED_IDENTIFIER;
        ac.loginEnabled = true;
      }
      
        

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



    function showSelector() {  
        selectorModal.open(ac.serviceProviders, onSelectorResult, onSelectorCancelled);
    }

    var ac = angular.extend(this, {
      // vars

      busy: false,
      loginEnabled: false,
      namedIdentifiers: [],
      selectedNamedIdentifier: {},
      serviceProviders:[],
      // funcs
      asyncLogin: asyncLogin,
      showSelector: showSelector,
      cancelLogin: cancelLogin
    });




    $scope.loginModal = loginModal;

    function init() {
      ac.busy = true;
      ac.loginEnabled = false;
      ac.selectedNamedIdentifier = DEFAULT_SELECTED_NAMED_IDENTIFIER;
      asyncPopulateSelector();
    }
    init();

  }
})();