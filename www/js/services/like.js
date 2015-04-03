angular.module('radio.service')
	.factory('Like', function(RootUrl, RadioAuth, $http) {

		var Like = {
			'request':function(args) {
				var API_URL = RootUrl + '/users/' + RadioAuth.user.id;
				var method = args.method;
				var extra_url = args.extra_url || '';
				var params = args.params || {};
				var data = args.data || {};
				return $http({
					'url':API_URL + extra_url,
					'method':method,
					'params':params,
					'data':data
				}).success(function(data, config, headers, status) {
				}).error(function(data, config, headers, status) {
					console.log("add like error", data);
				});
			},
			'productLike':function(product_id, method) {
				var Like = this;
				return Like.request({
					'method':method,
					'extra_url':'/products/' + product_id + '/like',
					'data':{
						'product':product_id,
						'user':RadioAuth.user.id
					}
				}).then(function(response) {
					return response;
				});
			},
			'codyLike':function(cody_id, method) {
				return Like.request({
					'method':method,
					'extra_url':'/codies/' + cody_id + '/like',
					'data':{
						'cody':cody_id,
						'user':RadioAuth.user.id
					}
				}).then(function(response){
					return response;
				})
			}

		};

		return Like;
	});