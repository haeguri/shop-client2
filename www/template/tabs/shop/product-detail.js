angular.module('radio.controller')

	.controller('ProductDetailCtrl', function(Shop, Cart, Brand, Like, $scope, $stateParams, 
		$location, $rootScope, $ionicSlideBoxDelegate, $ionicHistory) {

		$scope.product_detail = {};

		$scope.product_detail.colors = ['Black', 'White', 'Brown'];
		$scope.product_detail.select_color = $scope.product_detail.colors[0];

		$scope.product_detail.sizes = ['S','M','L','XL']
		$scope.product_detail.select_size = $scope.product_detail.sizes[1];

		$scope.product_detail.quantities = ['1', '2', '3', '4', '5'];
		$scope.product_detail.select_quantity = $scope.product_detail.quantities[0];

		$scope.product_detail.submenu = ['Description', 'Delivery'];

	 	$scope.myInterval = 5000;

	 	$scope.product_detail.selectedMenu = 'Description';

	 	var slideOnceUpdated = false;

	 	$scope.product_detail.test = function($event) {
	 		console.log("$event", $event);
	 	}

        $scope.product_detail.resizeSlides = function () {
    	/* fix for slides-box bug */
        	if(slideOnceUpdated == false ) {
        		slideOnceUpdated = true;
        		$ionicSlideBoxDelegate.update();
        	}
        }

		Shop.getProduct({
			'gender_id':$stateParams.gender_id, 
			'tag_id':$stateParams.tag_id,
			'product_id':$stateParams.product_id
		}).then(function(data) {
			$('div.product-button-bar a:first-child').addClass('active');
			$('#radio-tabs').addClass('tabs-item-hide');
			$scope.product_detail.product = data;
			/* products of brand*/
			Shop.getProducts({
				'params':{
					'filter':'brand',
					'brand_id':$scope.product_detail.product.brand.id
				},
				'tag_id':$stateParams.tag_id,
				'gender_id':$stateParams.gender_id
				}).then(function(data) {
					$scope.product_detail.products_of_brand = data;
				})
		});

		$scope.product_detail.addToCart = function() {
			Cart.addToCart({
				'data':{
					'cart':$scope.user.cart.id,
					'product':$scope.product_detail.product.id,
					'color':$scope.product_detail.select_color,
					'size':$scope.product_detail.select_size,
					'quantity':$scope.product_detail.select_quantity
				}
			}).then(function(data) {
				$scope.user.cart.cart_items_of_cart.push(data);
			});
		}

		$scope.product_detail.productLike = function(product_id) {
			console.log("clicked");
			if ($scope.product_detail.product.like == false) {
				Like.productLike(product_id, 'POST').then(function(response) {
					$scope.product_detail.product.like = true;
					$('#shop-detail-like').find('.fa.fa-heart.fa-lg').css('color', '#e60000');
				})
			} else {
				Like.productLike(product_id, 'DELETE').then(function(responnse) {
					$scope.product_detail.product.like = false;
					$('#shop-detail-like').find('.fa.fa-heart.fa-lg').css('color', '#444444');
				})
			}
		}

		$scope.product_detail.goCart = function() {
			$location.url('/tabs/private/info');
		};

		$scope.product_detail.viewInfo = function(menu_name) {
			if( $scope.product_detail.selectedMenu != menu_name) {
				$scope.product_detail.selectedMenu = menu_name;	
				$(event.target).addClass('active');
				$(event.target).siblings().removeClass('active');
			}
		}

		$scope.product_detail.goBack = function() {
			$('#radio-tabs').removeClass('tabs-item-hide');
			$ionicHistory.goBack();
		}
	});

