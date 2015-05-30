angular.module('radio.controller')

	.controller('TabsCtrl', function($scope, $ionicSlideBoxDelegate, $ionicHistory, $state,
		$rootScope) {

		$scope.tabs = {};

		$scope.tabs.clearCache = function() {
			$ionicHistory.clearCache()
		}

		$scope.tabs.goTab = function(menu) {
			var state = 'tabs.'+menu;
			// if(state == 'tabs.private' && $rootScope.user == undefined) {
	  //           $rootScope.lastStateName = $state.current.name;
	  //           $state.go('login');
			// } else {
			$state.go(state);
			$scope.tabs.clearCache();
			// }
		}
	});