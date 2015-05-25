angular.module('radio.controller', [])

	.controller('MasterCtrl', function($scope, $rootScope, RadioUtil, Cart, $ionicPopup,
		$route, $timeout, $location, $ionicScrollDelegate, RadioAuth, $ionicLoading,
		$rootScope, $location, $ionicModal, $ionicSlideBoxDelegate, $state, $stateParams) {

		$scope.master = {};

		$scope.$on('Logout', function() {
			$route.reload();
		});

		$scope.$on('LoginRequired', function() {
			$rootScope.lastStateName = $state.current.name;
			$rootScope.lastStateParams = {};
			for (var attr in $stateParams) {
				$rootScope.lastStateParams[attr] = $stateParams[attr];
			}
			$state.go('login');
		})

		$scope.$on('SuccessLogin', function(event, data) {
			// services/auth.js 의 RadioAuth로 부터 넘어오는 data의 포멧은 아래와 같음.
			// data = {'key':some_key_value, 'user':user_primary_key} 
			RadioAuth.getUser(data.user);

			if (RadioUtil.isEmpty($rootScope.lastStateParams) === true) {
				$state.go($rootScope.lastStateName);
			} else {
				$state.go($rootScope.lastStateName, $rootScope.lastStateParams);
			}
		});


	});