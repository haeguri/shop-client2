angular.module('radio.controller')
	.controller('LoginCtrl', function(RadioAuth, Validate, $scope, $location, $ionicPopup){
		$scope.login = {};

		$scope.requestLogin = function() {
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

		$scope.login.window_width = $(window).width();
		
	});