angular.module('radio.controller')
	
	.controller('BrandIntroCtrl', function($scope, $location) {
		$scope.brand_intro = {};

		$scope.brand_intro.openBrandList = function(gender_id) {
			$location.url('/tabs/brand/' + gender_id);
		}
	})