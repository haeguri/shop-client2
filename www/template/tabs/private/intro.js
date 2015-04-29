angular.module('radio.controller')

	.controller('PrivateIntroCtrl', function($state, $scope, $log, 
		$ionicHistory, RadioAuth, $rootScope) {

        $scope.private_intro = {};

        RadioAuth.getUser($rootScope.user.id).then(function(data) {
            //$rootScope.$broadcast('UserDataRefresh', data)
        });

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

        $scope.private_intro.goCart = function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
            $state.go('tabs.private.cart');
        }

    });