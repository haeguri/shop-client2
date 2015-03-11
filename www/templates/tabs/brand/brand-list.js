angular.module('radio.controller')

	.controller('BrandListCtrl', function(Brand, MediaUrl, $scope, $stateParams) {

		$scope.brand_list = {};
		$scope.brand_list.mediaUrl = MediaUrl;

		Brand.getBrands($stateParams.gender_id).then(function(data) {
			$scope.brand_list.brands = data;
		})

		$scope.brand_list.brandFollow = function(brand_id) {
			Brand.toggleFollow(brand_id).then(function(data){
				$scope.user.follow_brands = data;
			});
		}
	})
