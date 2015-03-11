angular.module('radio.service')
	.factory('Brand', function(RootUrl, $http, RadioAuth) {

		var Brand = {
			'request':function(args) {
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
			'getBrands':function(gender_id) {
				var Brand = this;
				return Brand.request({
					'method':'GET',
					'extra_url':'/designer/',
					'params':{
						'user_id':RadioAuth.user.id,
						'gender_id':gender_id
					}
				}).then(function(response) {
					return response.data;
				});
			},
			'toggleFollow':function(brand_id){
				var Brand = this;
				return Brand.request({
					'method':'POST',
					'extra_url': '/designer/' + brand_id,
					'params':{
						'user_id':RadioAuth.user.id
					}
				}).then(function(response) {
					return response.data;
				})
			}
		};

		return Brand;
	});