angular.module('radio.controller')

	.controller('PrivateIntroCtrl', function($state, $scope, $log, $cookies,
		$ionicHistory, RadioAuth, $rootScope, $route, $ionicPopup, $http) {

        $scope.private_intro = {};

        if ($rootScope.user != undefined) {
            RadioAuth.getUser($rootScope.user.id);
        } else {
            $rootScope.$broadcast('LoginRequired');
        }

        $scope.private_intro.goFollow = function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
        	$state.go('tabs.private.follow');
        };

        $scope.private_intro.goLike = function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
        	$state.go('tabs.private.like');
        };

        $scope.private_intro.goInfo = function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
            $state.go('tabs.private.info');  
        };

    });