angular.module('radio.controller', [])

	.controller('MasterCtrl', function($scope, $rootScope,$state, $stateParams, 
		$ionicHistory, $ionicLoading, RadioAuth, $q) {

	    $rootScope.$on('loading:show', function() {
	      $ionicLoading.show({template: 'Loading'});
	    });

	    $rootScope.$on('loading:hide', function() {
	      $ionicLoading.hide();
	    });

		$scope.$on('LoginRequired', function(toStateName) {
			$state.go('login');
			console.log("LoginRequired");
			$rootScope.lastStateName = $state.current.name;
			$rootScope.lastStateParams = {};
			for (var attr in $stateParams) {
				$rootScope.lastStateParams[attr] = $stateParams[attr];
			}
			console.log("$rootScope.lastStateName", $rootScope.lastStateName);
			console.log("$rootScope.lastStateParams", $rootScope.lastStateParams);
		})

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	        if (fromState.name == 'login' && toState.name != 'signup' && toState.name != 'tabs.private') {
				var state_pattern = /^tabs.main$|issue_detail|product_detail|channel_detail|brand_detail/.exec(toState.name)[0];
				$rootScope.$broadcast(state_pattern+'_reload');
			}
 	  	});

	});