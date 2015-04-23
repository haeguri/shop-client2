angular.module('radio.service')
	.factory('Follow', function(RootUrl, RadioAuth, $http) {
		var Follow = {
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
					console.log("follow error", data);
				});
			},
			'channelFollow':function(channel_id, method) {
				var Follow = this;
				return Follow.request({
					'method':method,
					'extra_url':'/channels/' + channel_id + '/follow',
					'data':{
						'channel':channel_id,
						'user':RadioAuth.user.id
					}
				}).then(function(response) {
					console.log("response", response.data);
					return response;
				});
			},
			'brandFollow':function(brand_id, method) {
				var Follow = this;
				return Follow.request({
					'method':method,
					'extra_url':'/brands/' + brand_id + '/follow',
					'data':{
						'brand':brand_id,
						'user':RadioAuth.user.id
					}
				}).then(function(response){
					return response;
				})
			}
		};

		return Follow;
	})