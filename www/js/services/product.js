angular.module('radio.service')
	.factory('Product', function(RootUrl, $http){

		var Product = {
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
			getGenders: function(){
				var Product = this;
				return Product.request({
					'extra_url': '/genders',
					'method':'GET'
				}).then(function(response){
					return response.data;
				})
			},
			'getTags' : function(args) {
				var Product = this;
				var params = args.params || {};
				return Product.request({
					'extra_url': '/genders/' + args.gender_id + '/tags',
					'method': 'GET',
					'params': params
				}).then(function(response) {
					return response.data;
				});
			},
			'getProducts' : function(args) {
				var Product = this;
				return Product.request({
					'method':'GET',
					'params':args.params,
					'extra_url': '/products',
			}).then(function(response) {
					return response.data;
				});
			},
			'getProduct' : function(args) {
				var Product = this;
				return Product.request({
					'method':'GET',
					'extra_url': '/products/' + args.product_id
				}).then(function(response) {
					return response.data;
				});
			},

			'getSorts' : function() {
				var Product = this;
				return Product.request({
					'method':'GET',
					'extra_url':'/product_sorts'
				}).then(function(response) {
					return response.data;
				})
			}
		}

		return Product;
	})