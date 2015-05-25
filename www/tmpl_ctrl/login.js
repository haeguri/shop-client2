angular.module('radio.controller')
	.controller('LoginCtrl', function(RadioAuth, Validate, $scope, 
		$rootScope, $ionicPopup, $state){
		$scope.login = {};

		$scope.login.requestLogin = function() {
			$scope.login.info_msg = '';
			if ($scope.login.username == '' && $scope.login.password == '') {
				$scope.login.alert_msg = '아이디와 비밀번호가 필요합니다.';
			} else if ($scope.login.username == '') {
				$scope.login.alert_msg = '아이디가 입력되지 않았습니다.';
			} else if ($scope.login.password == '') {
				$scope.login.alert_msg = '비밀번호가 입력되지 않았습니다.';
			} else {
				RadioAuth.login(
				$scope.login.username,
				$scope.login.password
				).then(function(data) {
					$scope.login.username = '';
					$scope.login.password = '';
				}, function(reason) {
					$scope.login.username = '';
					$scope.login.password = '';
				});
			}	
		}

		$scope.$on('LoginDeny', function(event, data) {
			$rootScope.$broadcast('loading:hide');
			console.log("login deny", data);
			if (data.hasOwnProperty('non_field_errors')) {
				$scope.login.alert_msg = '아이디 혹은 비밀번호가 잘못 입력됐습니다.'
			}
		});

		$rootScope.$on('SignUpAllowed', function(event, data) {
			console.log("SignUpAllowed & data !", data);
			$state.go('login');
			$scope.login.alert_msg = '';
			$scope.login.username = data.username;
			$scope.login.info_msg = '등록완료! 이제 로그인을 해주세요.';
		})

		$scope.login.window_width = $(window).width();
	});