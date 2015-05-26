angular.module('radio.service')
	.factory('Like', function(RootUrl, RadioAuth, $http, $q, $rootScope) {

		var Like = {
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
			'toggleProductLike':function(args) {
				var Like = this;
				return Like.request({
					'method':args.method,
					'extra_url':'/products/' + args.product_id + '/like'
				});
			},
			'toggleIssueLike':function(args) {
				return Like.request({
					'method':args.method,
					'extra_url':'/issues/' + args.issue_id + '/like'
				});
			}

		};

		return Like;
	});