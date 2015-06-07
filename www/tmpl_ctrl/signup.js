angular.module('radio.controller')

	.controller('SignupCtrl', function(RadioAuth, $scope, $location, $rootScope, $state){
		$scope.signup = {};
		$scope.signup.warnning = [];

		$scope.signup.requestSignUp = function() {
			$scope.signup.warnning = [];
			if ($scope.signup.email == undefined || $scope.signup.nickname == undefined ||
				$scope.signup.password1 == undefined || $scope.signup.password2 == undefined) {
				$scope.signup.warnning.push('필수정보 입력오류');
			} else if ($scope.signup.password1 != $scope.signup.password2) {
				$scope.signup.warnning.push('같지 않은 비밀번호');
			} else if ($scope.signup.password1.length < 6) {
				$scope.signup.warnning.push('비밀번호는 최소 6글자');
			} else {
				RadioAuth.signup(
					$scope.signup.email,
					$scope.signup.nickname,
					$scope.signup.password1,
					$scope.signup.password2
				).then(function(data) {
					// LoginCtrl에서 'SignUpAllowed' 이벤트를 기다리고 있다.
					console.log("Success Signup", data);
					$rootScope.$broadcast('SignUpAllowed', data);
					$scope.signup.email = '';
					$scope.signup.nickname = '';
					$scope.signup.password1 = '';
					$scope.signup.password2 = '';
				}, function(data) {
					console.log("data", data);
					$rootScope.$broadcast('SignUpDeny', data);
				});
			}
		};

		$scope.$on('SignUpDeny', function(event, data) {
			$rootScope.$broadcast('loading:hide');
			// if (data.hasOwnProperty('username')) {
			// 	$scope.signup.warnning.push('이미 등록된 아이디');
			// };
			if (data.hasOwnProperty('email')) {
				$scope.signup.warnning.push('이미 등록된 이메일');
			};
			if (data.hasOwnProperty('nickname')) {
				$scope.signup.warnning.push('이미 등록된 닉네임');
			}
			if (data.hasOwnProperty('password')) {
				$scope.signup.warnning.push('비밀번호는 최소 6글자');
			};
		})
			
	});