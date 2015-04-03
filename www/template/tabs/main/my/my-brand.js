angular.module('radio.controller')
	.controller('MyBrandCtrl', function(Channel, $location, $rootScope, $scope, $stateParams, Follow) {

		$scope.my_brand = {};

		$scope.my_brand.brandFollow = function(brand_id) {
			Brand.toggleFollow(brand_id).then(function(data){
				$scope.user.follow_brands = data;
			});
		}
	});