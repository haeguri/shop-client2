angular.module('radio.controller')
	
	.controller('ShopIntroCtrl', function($scope, $location) {
		$scope.shop_intro = {};

		$scope.shop_intro.openShopList = function(gender_id) {
			$location.url('/tabs/shop/' + gender_id + '/product');
		}
	})