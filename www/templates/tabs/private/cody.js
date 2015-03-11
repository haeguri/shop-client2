angular.module('radio.controller')

	.controller('PrivateCodyCtrl', function(MediaUrl, $scope) {
		$scope.private_cody = {};

		$scope.private_cody.mediaUrl = MediaUrl;
	})
