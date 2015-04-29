angular.module('radio.controller')

	.controller('PrivateCartCtrl', function(Cart, $scope) {

        $scope.private_cart = {};

		$scope.private_cart.delFromCart = function(item_id) {
			Cart.delFromCart({
				'item_id':item_id
			}).then(function(data){
				$scope.user.cart = data;
			});
		}

	});