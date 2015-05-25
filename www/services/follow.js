angular.module('radio.service')
	.factory('Follow', function(RootUrl, RadioAuth, $http, $rootScope) {
		var Follow = {
			'request':function(args) {
				if ($rootScope.user === undefined) {
					//www/tmpl_ctrl/master.js
					$rootScope.$broadcast('LoginRequired');
				} else {
					var API_URL = RootUrl + '/users/' + $rootScope.user.id;
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
				}
				
			},
			'toggleChannelFollow':function(args) {
				var Follow = this;
				return Follow.request({
					'method':args.method,
					'extra_url':'/channels/' + args.channel_id + '/follow'
				}).then(function(response) {
					console.log("response", response.data);
					return response;
				});
			},
			'toggleBrandFollow':function(args) {
				var Follow = this;
				return Follow.request({
					'method':args.method,
					'extra_url':'/brands/' + args.brand_id + '/follow',
				}).then(function(response) {
					return response;
				});
			}
		};

		return Follow;
	})