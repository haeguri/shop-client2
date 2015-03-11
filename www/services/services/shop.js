angular.module('radio.service')
	.factory('Shop', function(RootUrl, $http){

		var Shop = {
			'request' : function(args) {
				var extra_url = args.extra_url || '';
				var method = args.method || '';
				var params = args.params || {};
				return $http({
					'url' : RootUrl + extra_url,
					'method' : method || {},
					'params' : params || {},
				}).success(function(data, status, headers, config, test) {

				}).error(function(data, status, headers, config){
					console.log("error data", data);
				});
			},

			'queryCategory': function(gender_id){
				var Shop = this;
				return $http({
					'url': RootUrl + '/category/' + gender_id,
					'method': 'GET'
				}).then(function(response) {
					return response.data;
				});
			},

			'queryTag' : function(gender_id) {
				var Shop = this;
				return $http({
					//'extra_url': RootUrl + '/tag/' + gender_id,
					'url': RootUrl + '/tag/' + gender_id,
					'method': 'GET'
				}).then(function(response) {
					return response.data;
				});
			},
				
			'queryProduct' : function(args) {
				var Shop = this;
				return Shop.request({
					'method':'GET',
					'extra_url': '/product',
					'params': args.params
				}).then(function(response) {
					return response.data;
				});
			},

			'getProduct' : function(product_id) {
				var Shop = this;
				return Shop.request({
					'method':'GET',
					'extra_url':'/product/' + product_id
				}).then(function(response) {
					return response.data;
				});
			},
		}

		return Shop;
	})