angular.module('radio.service')
	.factory('Like', function(RootUrl, $http) {

		var Like = {
			'request':function(args) {
				var API_URL = RootUrl + '/user/' + args.user_id + '/product/' + args.product_id + '/like';
				return $http({
					'url':API_URL,
					'method':args.method
				}).success(function(data, config, headers, status) {
				}).error(function(data, config, headers, status) {
					console.log("add like error", data);
				});
			},
			'toggle':function(user_id, product_id) {
				var Like = this;
				return Like.request({
					'user_id':user_id,
					'product_id':product_id,
					'method':'POST'
				}).then(function(response) {
					return response.data;
				});
			}
		};

		return Like;
	});