angular.module('radio.controller')
	.controller('LoginCtrl', function(RadioAuth, $scope, $rootScope, $ionicPopup, 
		$state, $http, $cookies, RadioUtil, $ionicHistory, $rootScope){

		$scope.login = {};

		$scope.login.requestLogin = function() {
			$scope.login.info_msg = '';
			if ($scope.login.username == '' && $scope.login.password == '') {
				$scope.login.alert_msg = '닉네임과 비밀번호가 필요합니다.';
			} else if ($scope.login.username == '') {
				$scope.login.alert_msg = '닉네임이 입력되지 않았습니다.';
			} else if ($scope.login.password == '') {
				$scope.login.alert_msg = '비밀번호가 입력되지 않았습니다.';
			} else {
				$rootScope.storage.NICKNAME = $scope.login.username;
				$rootScope.storage.PASSWORD = $scope.login.password;

				RadioAuth.login(
					$scope.login.username,
					$scope.login.password
				);
			}	
		}

		$scope.login.goBack = function() {
			$ionicHistory.goBack();
		}

		$rootScope.$on('LoginDenied', function(event, data) {
			console.log("LoginDenied", reason);
			$scope.login.username = '';
			$scope.login.password = '';
			$rootScope.$broadcast('loading:hide');
			if (reason.hasOwnProperty('non_field_errors')) {
				$scope.login.alert_msg = '닉네임 혹은 비밀번호가 잘못 입력됐습니다.'
			}
		})

		$rootScope.$on('SignUpAllowed', function(event, data) {
			$state.go('login');
			$scope.login.alert_msg = '';
			$scope.login.username = data.username;
			$scope.login.info_msg = '등록완료! 이제 로그인을 해주세요.';
		})

		$scope.login.window_width = $(window).width();
	});