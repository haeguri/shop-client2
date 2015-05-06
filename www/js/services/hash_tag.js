angular.module('radio.service')
	.factory('HashTag', function(RootUrl, RadioAuth, $http, $rootScope) {
		var HashTag = {
			'request':function(args) {
				var method = args.method || 'GET';
				var extra_url = args.extra_url || '';
				var params = args.params || {};
				return $http({
					'url': RootUrl + extra_url,
					'method':method,
					'params':params,
				}).success(function(data, config, headers, status) {
				}).error(function(data, config, headers, status) {
					console.log("follow error", data);
				});
			},
			'getHashTags': function(args){
				var HashTag = this;
				var params = args.params;
				return HashTag.request({
					'extra_url':'/hashtags',
					'params':params
				}).then(function(response) {
					return response.data;
				});
			}
		};

		return HashTag;
	})