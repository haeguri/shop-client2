angular.module('radio.controller')

	.controller('SignupCtrl', function(RadioAuth, $scope, $location){
		$scope.signup = {};

		$scope.requestSignup = function() {
			RadioAuth.signup(
					$scope.signup.username,
					$scope.signup.email,
					$scope.signup.password1,
					$scope.signup.password2
				).then(function() {
					$location.url('/login');
				});
		};
		
	});