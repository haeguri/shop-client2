angular.module('radio.controller')

	.controller('ProductSortCtrl', function(Shop, $scope, $ionicModal) {
		$scope.product_sort = {};

		Shop.getSorts().then(function(data) {
			$scope.product_sort.sorts = data;
		})
	});