angular.module('radio.controller')
	.controller('LoginCtrl', function(RadioAuth, Validate, $scope, 
		$rootScope, $location, $ionicPopup){
		$scope.login = {};

		$scope.login.requestLogin = function() {
			if ($scope.login.username == '' && $scope.login.password == '') {
				$scope.login.warnning = '아이디와 비밀번호가 필요합니다.';
			} else if ($scope.login.username == '') {
				$scope.login.warnning = '아이디가 입력되지 않았습니다.';
			} else if ($scope.login.password == '') {
				$scope.login.warnning = '비밀번호가 입력되지 않았습니다.';
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
				$scope.login.warnning = '아이디 혹은 비밀번호가 잘못 입력됐습니다.'
			}
		});

		$scope.login.window_width = $(window).width();
	});