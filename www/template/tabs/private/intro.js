angular.module('radio.controller')

	.controller('PrivateIntroCtrl', function($state, $scope, $log, 
		$ionicHistory) {

        $scope.private_intro = {};

        $scope.private_intro.showFollow = function() {
        	$state.go('tabs.private_follow');
        	$log.log('show follow');
        };

        $scope.private_intro.showLike = function() {
        	$state.go('tabs.private_like');
        	$log.log('show like');
        };

    });