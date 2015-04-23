angular.module('radio.controller')

	.controller('PrivateInfoCtrl', function(RadioAuth, Cart, $scope, $location) {
		$scope.private_info = {};

		$scope.private_info.del_list = [];

		$scope.private_info.menus = [
			'Cart', 'Brand', 'Product', 'Issue'
		];

		$scope.private_info.test = function() {
			console.log("slidebox init");
		}

		$scope.private_info.requestLogout = function() {
			RadioAuth.logout().then(function() {
				window.location.reload();
				$location.url('/login');
				console.log("logout");
			});
		}

		$scope.private_info.delFromCart = function() {
			Cart.delFromCart($scope.private_info.del_list).then(function(data){
				$scope.user.cart.cart_items_of_cart = data;
			});
		}

		$scope.private_info.upQuantity = function(i) {
			if($scope.user.cart.cart_items_of_cart[i].quantity <= 4)
				++$scope.user.cart.cart_items_of_cart[i].quantity;
		}

		$scope.private_info.downQuantity = function(i) {
			if($scope.user.cart.cart_items_of_cart[i].quantity >= 2)
				--$scope.user.cart.cart_items_of_cart[i].quantity;
		}
	})
