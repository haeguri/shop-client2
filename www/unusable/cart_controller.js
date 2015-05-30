angular.module('radio.controller')

	.controller('PrivateCartCtrl', function(Cart, $scope, $rootScope, $ionicScrollDelegate) {

        $scope.private_cart = {};
        $scope.private_cart.currentView = '장바구니';
        // 구매상품 가격의 합
        $scope.private_cart.sum_price = 0;
        // 배송비
        $scope.private_cart.shipping = 0;
        // 구매상품 가격의 합 + 배송비
        $scope.private_cart.total_price = 0;

        $('div.two-button-bar.follow a.button:first-child').addClass('actived');

        var sumTotalPrice = function() {
			var cart_items = $rootScope.user.cart.cart_items_of_cart;

			for(var i = 0; i < cart_items.length; i++) {
				$scope.private_cart.sum_price += cart_items[i].product.price;
			}

			$scope.private_cart.shipping = $scope.private_cart.sum_price < 50000 ? 2500 : 0;
			$scope.private_cart.total_price = $scope.private_cart.shipping + $scope.private_cart.sum_price;
		}

		sumTotalPrice();

		$scope.private_cart.delFromCart = function(item_id) {
			Cart.delFromCart({
				'item_id':item_id
			}).then(function(data){
				$rootScope.user.cart = data;
			});
		}

		$scope.private_cart.toggleView = function(new_view) {
        	$(event.target).addClass('actived');
			$(event.target).siblings('a').removeClass('actived');
			$scope.private_cart.currentView = new_view;
			$ionicScrollDelegate.resize();
        }

        $scope.private_cart.requestOrder = function() {
        	Cart.requestOrder({
				'data':{
					'to_name':$scope.private_cart.recipient,
					'mobile_no':$scope.private_cart.mobile_no,
					'addr1':$scope.private_cart.addr1,
					'addr2':$scope.private_cart.addr2,
					'ship_msg':$scope.private_cart.ship_msg
				}
			}).then(function(data) {
				console.log("success requestOrder", data);
			});
        }

	});