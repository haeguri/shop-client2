angular.module('radio.service')
	.factory('Search', function(RootUrl, RadioAuth, $http, $rootScope) {
		var Search = {
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
			'getQuery': function(args){
				var Search = this;
				var params = args.params;
				return Search.request({
					'extra_url':'/search',
					'params':params
				}).then(function(response) {
					return response.data;
				});
			}
		};

		return Search;
	})