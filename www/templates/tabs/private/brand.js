angular.module('radio.controller')

	.controller('PrivateBrandCtrl', function(MediaUrl, Brand, $scope) {
		$scope.private_brand = {};

		$scope.private_brand.mediaUrl = MediaUrl;

		$scope.private_brand.brandUnfollow = function(brand_id) {
			Brand.toggleFollow(brand_id).then(function(data){
				$scope.user.follow_brands = data;
			})
		}
	})
