angular.module('radio.controller')

	.controller('ProductDetailCtrl', function(Product, Cart, Brand, Like, $scope, $stateParams, 
		$location, $rootScope, $ionicSlideBoxDelegate, $ionicHistory, $ionicScrollDelegate, 
		$state) {

		$scope.product_detail = {};

		$scope.product_detail.submenu = ['Description', 'Delivery'];

	 	$scope.product_detail.selectedMenu = 'Description';

	 	var slideOnceUpdated = false;
	 	var method = '';
	 	var url_pattern = '';

        var getProduct = function() {
			Product.getProduct({
				'product_id':$stateParams.product_id
			}).then(function(data) {
				$('div.two-button-bar a:first-child').addClass('active');
				$scope.product_detail.product = data;
				$ionicSlideBoxDelegate.update();
			});
        }

        // Product Data 초기화 작업
        getProduct();

		$rootScope.$on('product_detail_reload', function() {
            console.log("product_detail_reload!");
            getProduct();
            $ionicHistory.clearCache();
        })

		$scope.product_detail.toggleLike = function(event) {
			method = $scope.product_detail.product.like === false ? 'POST' : 'DELETE';
			Like.toggleProductLike({
				'product_id': $scope.product_detail.product.id,
				'method':method
			}).then(function() {
				if ($scope.product_detail.product.like === false) {
                    $scope.product_detail.product.like = true;
                    $(event.target).addClass('true').removeClass('false');
                    console.log("add like");
                } else {
                    $scope.product_detail.product.like = false;
                    $(event.target).removeClass('true').addClass('false');
                    console.log("cancel like");
                }
			}, function(reason) {
				console.log("Like Failed! Reason : ", reason);
			})
		}

		url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

		$scope.product_detail.goTagGlobalProducts = function(tag_id) {
			$state.go('tabs.' + url_pattern + '_tag_global', {'tag':tag_id,'view':'products'})
		}

		$scope.product_detail.goBrandDetail = function(brand_id) {
			$state.go('tabs.' + url_pattern + '_brand_detail', {'brand_id':brand_id})
		}

		$scope.product_detail.viewInfo = function(menu_name) {
			if( $scope.product_detail.selectedMenu != menu_name) {
				$scope.product_detail.selectedMenu = menu_name;
				$(event.target).addClass('active');
				$(event.target).siblings().removeClass('active');
				$ionicScrollDelegate.resize();
			}
		}

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

	});

