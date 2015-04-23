angular.module('radio.controller')

	.controller('PrivateBrandCtrl', function(Brand, $scope, $rootScope, Follow) {
		$scope.private_brand = {};

		$scope.private_brand.brandUnfollow = function(brand_id) {
			Follow.brandFollow(brand_id, 'DELETE').then(function(){
				$rootScope.$broadcast('BrandListUpdate');
			})
		}
	})
