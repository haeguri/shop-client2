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
			getGenders: function(){
				var Shop = this;
				return Shop.request({
					'extra_url': '/genders',
					'method':'GET'
				}).then(function(response){
					return response.data;
				})
			},
			'getTags' : function(args) {
				var Shop = this;
				var params = args.params || {};
				return Shop.request({
					'extra_url': '/genders/' + args.gender_id + '/tags',
					'method': 'GET',
					'params': params
				}).then(function(response) {
					return response.data;
				});
			},
			'getProducts' : function(args) {
				var Shop = this;
				var params = args.params || {};
				return Shop.request({
					'method':'GET',
					'extra_url': '/products',
					'params':params
			}).then(function(response) {
					return response.data;
				});
			},
			'getProduct' : function(args) {
				var Shop = this;
				return Shop.request({
					'method':'GET',
					'extra_url': '/genders/' + args.gender_id + '/tags/' + args.tag_id + '/products/' + args.product_id
				}).then(function(response) {
					return response.data;
				});
			},

			'getSorts' : function() {
				var Shop = this;
				return Shop.request({
					'method':'GET',
					'extra_url':'/product_sorts'
				}).then(function(response) {
					return response.data;
				})
			}
		}

		return Shop;
	})