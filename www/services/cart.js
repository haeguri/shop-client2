angular.module('radio.service')

	.factory('Cart', function($http, RootUrl, $rootScope, RadioAuth) {
		var Cart = {
			'data':{},
			'request':function(args) {
				var Cart = this;
				var method = args.method || '';
				var data = args.data || {};
				var params = args.params || {};
				var extra_url = args.extra_url || '';
				return $http({
					'url': RootUrl + extra_url,
					'method':method,
					'data':data,
					'params':params,
					'headers': {
					   'Content-Type': 'application/json'
					 },
				}).success(function(response) {

				}).error(function(data, config, headers, status) {
					console.log("cart error data", data);
				})
			},
			'addToCart':function(args) {
				var Cart = this;
				return Cart.request({
					'method':'POST',
					'extra_url':'/cart/items',
					'data':args.data,
				}).then(function(response) {
					console.log("success add to Cart", response.data);
					return response.data;
				}, function(reason) {
					console.log("error reason for cart add", reason);
				})
			},
			'delFromCart':function(args) {
				var Cart = this;
				return Cart.request({
					'method':'DELETE',
					'extra_url':'/cart/items/' + args.item_id
				}).then(function(response) {
					return response.data;
				},function(response) {
					console.log("response", response);
				});
			},
			'requestOrder':function(args) {
				var Cart = this;
				return Cart.request({
					'method':'POST',
					'extra_url':'/order',
					'data':args.data
				}).then(function(response) {
					console.log("Order request is successfully processes.", response.data);
					return response.data;
				}, function(reason) {
					console.log("error reason for cart add", reason);
				})
			}
		};

		return Cart;

	});