angular.module('radio.controller')
	.controller('MyProductCtrl', function(Shop, Like, RadioAuth, $scope, $location) {

		$scope.my_product = {};

		$scope.my_product.products = [];

		$scope.my_product.toggleLike = function(product_id) {
			Like.toggle($scope.user.id, product_id).then(function(data) {
				if(data.status === true) {
					$('#product-heart-'+product_id).css("color", "#e60000");
					$('#product-count-'+product_id).html(data.likes);
				}else {
					$('#product-heart-'+product_id).css("color", "#444444");
					$('#product-count-'+product_id).html(data.likes);
				}
			});
		};

		$scope.my_product.openShopDetail = function(product) {
			console.log("data", product.tag);
			console.log("product.tag.gender", product.tag.gender);
			console.log("product.tag.id", product.tag.id);
			$location.url('/tabs/main/genders/' + product.tag.gender + '/tags/' + product.tag.id + '/products/' + product.id);
		}


	});

