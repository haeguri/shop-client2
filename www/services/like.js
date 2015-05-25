angular.module('radio.service')
	.factory('Like', function(RootUrl, RadioAuth, $http, $rootScope) {

		var Like = {
			'request':function(args) {
				if ($rootScope.user === undefined) {
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
						console.log("add like error", data);
					});
				}
			},
			'toggleProductLike':function(args) {
				var Like = this;
				return Like.request({
					'method':args.method,
					'extra_url':'/products/' + args.product_id + '/like'
				});
				// }).then(function(response) {
				// 	return response;
				// });
			},
			'toggleIssueLike':function(args) {
				return Like.request({
					'method':args.method,
					'extra_url':'/issues/' + args.issue_id + '/like'
				})
				// }).then(function(response){
				// 	return response;
				// })
			}

		};

		return Like;
	});