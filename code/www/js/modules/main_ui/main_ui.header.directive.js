(function (){
  'use strict';

  angular
    .module( 'gaddum.main_ui' )
    .directive( 'gaddum.mainUi.header' , function(){

      return{
        restrict: "E",
        template: '<div class="bar bar-subheader"><a ng-show="previous!=false" ng-click="goPrev()" class="button icon-left ion-chevron-left button-clear button-dark"></a><h2 class="title whiteBold">{{name}}</h2><a ng-show="next!=false" ng-click="goNext()" class="button icon-right ion-chevron-right button-clear button-dark"></a></div>',
        bindToController: true,
        replace: true,//true,
        //transclude: true,
        scope : {
          name:'=name',
          currentState: '=order'
        },
        link: function($scope, $element, $attrs) {
          //$scope.name = $attrs.name//;
//          $scope.currentState = $attrs.order;
        },
        controllerAs: "gh",
        controller: ['$scope','$attrs','$rootScope','$state','$ionicSlideBoxDelegate', function($scope,$attrs,$rootScope,$state,$ionicSlideBoxDelegate){
          //console.log($scope,$ionicSlideBoxDelegate.currentIndex());
          var currentState = undefined;
          $scope.name = $attrs.name;
          $($("#main_wrapper").find("ion-slide")).each(function( i ) {
            if( $($("#main_wrapper").find("ion-slide")[i]).attr("ion-slide-tab-label") === $scope.name ) {
              currentState=parseInt(i);
              $scope.order = parseInt(i);
            }
          });
          var maxStates = $("#main_wrapper").find("ion-slide").length-1;
          if(currentState === 0  ) {
            $scope.previous = false;
          } else {
            $scope.previous = "gaddum." + $($("#main_wrapper").find("ion-slide")[currentState-1]).data("state");
          }

          if(currentState===maxStates) {
            $scope.next = false;
          } else {
            $scope.next = "gaddum." + $($("#main_wrapper").find("ion-slide")[currentState+1]).data("state");
          }

          $scope.goNext = function goNext() {
            $ionicSlideBoxDelegate.slide(currentState+1);
          };
          $scope.goPrev = function goPrev(){
            $ionicSlideBoxDelegate.slide(currentState-1);

          };
        }],
      };
    });
})();
