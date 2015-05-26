angular.module('radio.service')
	.factory('Follow', function(RootUrl, $q, RadioAuth, $http, $rootScope) {
		var Follow = {
			'request':function(args) {
				var deferred = $q.defer();
				if ($rootScope.user === undefined) {
					$rootScope.$broadcast('LoginRequired');
					deferred.reject();
				} else {
					var API_URL = RootUrl + '/users/' + $rootScope.user.id;
					var method = args.method;
					var extra_url = args.extra_url || '';
					var params = args.params || {};
					var data = args.data || {};
					$http({
						'url':API_URL + extra_url,
						'method':method,
						'params':params,
						'data':data
					}).success(function(data, config, headers, status) {
						deferred.resolve(data, status);
					}).error(function(data, config, headers, status) {
						deferred.reject(data, status);
					});
				}

				return deferred.promise;
				
			},
			'toggleChannelFollow':function(args) {
				var Follow = this;
				return Follow.request({
					'method':args.method,
					'extra_url':'/channels/' + args.channel_id + '/follow'
				});
			},
			'toggleBrandFollow':function(args) {
				var Follow = this;
				return Follow.request({
					'method':args.method,
					'extra_url':'/brands/' + args.brand_id + '/follow',
				});
			}
		};

		return Follow;
	})