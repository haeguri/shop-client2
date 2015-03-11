angular.module('radio.controller')

	.controller('ShopDetailCtrl', function(MediaUrl, Shop, Cart, Like, $scope, $stateParams, $location, $rootScope) {
		$scope.shop_detail = {};

		console.log("shop-detail");

		Shop.getProduct($stateParams.product_id).then(function(data) {
			$scope.shop_detail.product = data;
			$scope.shop_detail.mediaUrl = MediaUrl;

			for(var i in data.likes_of_product) {
				if(data.likes_of_product[i].user == $scope.user.id) {
					data['like'] = true;
				} else {
					data['like'] = false;
				}
			}
		});

		$scope.shop_detail.colors = ['Black', 'White', 'Brown'];
		$scope.shop_detail.select_color = $scope.shop_detail.colors[0];

		$scope.shop_detail.sizes = ['S','M','L','XL']
		$scope.shop_detail.select_size = $scope.shop_detail.sizes[1];

		$scope.shop_detail.quantities = ['1', '2', '3', '4', '5'];
		$scope.shop_detail.select_quantity = $scope.shop_detail.quantities[0];

		$scope.shop_detail.addToCart = function() {
			Cart.addToCart({
				'data':{
					'cart':$scope.user.cart.id,
					'product':$scope.shop_detail.product.id,
					'color':$scope.shop_detail.select_color,
					'size':$scope.shop_detail.select_size,
					'quantity':$scope.shop_detail.select_quantity
				}
			}).then(function(data) {
				$scope.user.cart.cart_items_of_cart.push(data);
			});
		}

		$scope.shop_detail.toggleBrandFollow = function() {

		}

		$scope.shop_detail.toggleLike = function(product_id) {
			Like.toggle($scope.user.id, product_id).then(function(data) {
				if(data.status === true) {
					$('#shop-detail-like').find('i').css("color", "#e60000");
					$('#shop-detail-like-info').html(data.likes + '명이 좋아합니다.');
				}else {
					$('#shop-detail-like').find('i').css("color", "#444444");
					$('#shop-detail-like-info').html(data.likes + '명이 좋아합니다.');
				}
			});
		}

		$scope.shop_detail.goCart = function() {
			$location.url('/tabs/private/info');
		};

	});

