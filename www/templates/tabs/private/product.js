angular.module('radio.controller')	

	.controller('PrivateProductCtrl', function($scope, MediaUrl) {

		$scope.private_product = {};

		$scope.private_product.mediaUrl = MediaUrl;
	});