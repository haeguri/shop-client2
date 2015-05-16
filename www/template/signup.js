angular.module('radio.controller')

	.controller('SignupCtrl', function(RadioAuth, $scope, $location, $rootScope, $state){
		$scope.signup = {};
		$scope.signup.warnning = [];

		$scope.signup.requestSignUp = function() {
			$scope.signup.warnning = [];
			console.log("username", $scope.signup.username);
			if ($scope.signup.username == undefined || $scope.signup.email == undefined || 
				$scope.signup.password1 == undefined || $scope.signup.password2 == undefined) {
				$scope.signup.warnning.push('필수정보 입력오류');
			} else if ($scope.signup.username.length < 4) {
				$scope.signup.warnning.push('아이디는 최소 4글자');
			} else if ($scope.signup.password1 != $scope.signup.password2) {
				$scope.signup.warnning.push('같지 않은 비밀번호');
			} else if ($scope.signup.password1.length < 6) {
				$scope.signup.warnning.push('비밀번호는 최소 6글자');
			} else {
				RadioAuth.signup(
					$scope.signup.username,
					$scope.signup.email,
					$scope.signup.password1,
					$scope.signup.password2
				).then(function(data) {
					$scope.signup.username = '';
					$scope.signup.email = '';
					$scope.signup.password1 = '';
					$scope.signup.password2 = '';
				});
			}
		};

		$scope.$on('SignUpDeny', function(event, data) {
			$rootScope.$broadcast('loading:hide');
			console.log("signup deny!", data);
			if (data.hasOwnProperty('username')) {
				$scope.signup.warnning.push('이미 등록된 아이디');
			};
			if (data.hasOwnProperty('email')) {
				$scope.signup.warnning.push('이미 등록된 이메일');
			};
			if (data.hasOwnProperty('password')) {
				$scope.signup.warnning.push('비밀번호는 최소 6글자');
			};
		})
			
	});