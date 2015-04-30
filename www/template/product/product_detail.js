angular.module('radio.controller')

	.controller('ProductDetailCtrl', function(Product, Cart, Brand, Like, $scope, $stateParams, 
		$location, $rootScope, $ionicSlideBoxDelegate, $ionicHistory) {

		$scope.product_detail = {};

		$scope.product_detail.colors = ['Black', 'White', 'Brown'];
		$scope.product_detail.select_color = $scope.product_detail.colors[0];

		$scope.product_detail.sizes = ['S','M','L','XL']
		$scope.product_detail.select_size = $scope.product_detail.sizes[1];

		$scope.product_detail.quantities = ['1', '2', '3', '4', '5'];
		$scope.product_detail.select_quantity = $scope.product_detail.quantities[0];

		$scope.product_detail.submenu = ['Description', 'Delivery'];

	 	$scope.product_detail.selectedMenu = 'Description';

	 	var slideOnceUpdated = false;
	 	var method = '';
	 	var url_pattern = '';

        $scope.product_detail.resizeSlides = function () {
    		/* modal을 띄운 후 slide 박스의 넓이가 0이되는 이슈를 위한 코드*/
        	if(slideOnceUpdated == false ) {
        		slideOnceUpdated = true;
        		$ionicSlideBoxDelegate.update();
        	}
        }

		Product.getProduct({
			'product_id':$stateParams.product_id
		}).then(function(data) {
			$('div.product-button-bar a:first-child').addClass('active');
			$scope.product_detail.product = data;
		});

		$scope.product_detail.addToCart = function() {
			Cart.addToCart({
				'data':{
					'cart':$rootScope.user.cart.id,
					'product':$scope.product_detail.product.id,
					'color':$scope.product_detail.select_color,
					'size':$scope.product_detail.select_size,
					'quantity':$scope.product_detail.select_quantity
				}
			}).then(function(data) {
				$scope.user.cart.cart_items_of_cart.push(data);
			});
		}

		$scope.product_detail.productLike = function($event) {
			console.log("clicked");
			/* 리팩토링 해야함 */
			if ($scope.product_detail.product.like == false) {
				method = 'POST';
				Like.toggleProductLike({
					'product_id': $scope.product_detail.product.id,
					'method':method
				}).then(function(response) {
					$scope.product_detail.product.like = true;
					$(event.target).addClass('true').removeClass('false');
				})
			} else {
				method = 'DELETE';
				Like.toggleProductLike({
					'product_id': $scope.product_detail.product.id,
					'method':method
				}).then(function(responnse) {
					$scope.product_detail.product.like = false;
					$(event.target).removeClass('true').addClass('false');
					
				})
			}
		}

		$scope.product_detail.goCart = function() {
			$location.url('/tabs/private/info');
		};

		url_pattern = /\/\#\/main\/|\/\#\/channel\/|\/#\/private\/|\/#\/search\//.exec($location.absUrl())[0];

		$scope.product_detail.goHashTagGlobal = function(tag) {
			switch(url_pattern) {
                case '/#/main/':
                    $location.url('/main/hashtag/products?tag='+tag.id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/hashtag/products?tag='+tag.id);
                    break;
                case '/#/private/':
                    $location.url('/private/hashtag/products?tag='+tag.id);
                    break;
                case '/#/search/':
                    $location.url('/search/hashtag/products?tag='+tag.id);
                    break;
            }
		}

		$scope.product_detail.goBrandDetail = function(brand_id) {
			switch(url_pattern) {
                case '/#/main/':
                    $location.url('/main/brands/'+brand_id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/brands/'+brand_id);
                    break;
                case '/#/private/':
                    $location.url('/private/brands/'+brand_id);
                    break;
                case '/#/search/':
                    $location.url('/search/brands/'+brand_id);
                    break;
            }
		}

		$scope.product_detail.viewInfo = function(menu_name) {
			if( $scope.product_detail.selectedMenu != menu_name) {
				$scope.product_detail.selectedMenu = menu_name;	
				$(event.target).addClass('active');
				$(event.target).siblings().removeClass('active');
			}
		}
	});

