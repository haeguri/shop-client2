angular.module('radio.controller')

	.controller('BrandSortCtrl', function(Shop, $scope, $ionicModal) {
		$scope.brand_sort = {};

		Shop.getSorts().then(function(data) {
			$scope.brand_sort.sorts = data;
		})
	});