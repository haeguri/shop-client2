angular.module('radio.controller', [])

	.controller('MasterCtrl', function($scope, $rootScope,$state, $stateParams, 
		$ionicHistory) {

		$scope.$on('LoginRequired', function(toStateName) {
			if (toStateName == 'tabs.private.follow') {
				$rootScope.lastStateName = 'tabs.private.follow';
				$rootScope.lastStateParams = {};
				$state.go('login');
			} else {
				$rootScope.lastStateName = $state.current.name;
				$rootScope.lastStateParams = {};
				for (var attr in $stateParams) {
					$rootScope.lastStateParams[attr] = $stateParams[attr];
				}
				$state.go('login');
			}
		})

		// 자주 발생되는 이벤트 pub/sub에 따른 오버헤드를 줄이기 위해 $rootScope에서 한번 $on을 써봄. 
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			// if (toState.name == 'tabs.private.follow' && $rootScope.user == undefined) {
			// 	$rootScope.$broadcast('LoginRequired', toState.name);
			// } else if (fromState.name == 'login'  && toState.name != 'tabs.private.follow' && $rootScope.user != undefined) {
			if (fromState.name == 'login'  && $rootScope.user != undefined) {
				var state_pattern = /^tabs.main$|issue_detail|product_detail|channel_detail|brand_detail|private.follow/.exec(toState.name)[0];
				$rootScope.$broadcast(state_pattern+'_reload');
			}
 	  	});


	});