angular.module('radio.controller')

	.controller('TabsCtrl', function($scope, $ionicSlideBoxDelegate) {

		$scope.tabs = {};

		$scope.tabs.slideUpdate = function() {
			$ionicSlideBoxDelegate.update();
		}
	});