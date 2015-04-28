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
					'extra_url':'/genders/'+gender_id+'/brands',
				}).then(function(response) {
					return response.data;
				});
			},

			'getBrand':function(args){
				var Brand = this;
				var params = args.params || {};
				return Brand.request({
					'method':'GET',
					'extra_url': '/brands/' + args.brand_id,
					'params':params
				}).then(function(response) {
					return response.data;
				})
			},

			'getFeeds':function(args){
				var Brand = this;
				var params = args.params || {};
				return Brand.request({
					'method':'GET',
					'extra_url': '/brands/' + args.brand_id +'/feeds',
					'params':params
				}).then(function(response) {
					return response.data;
				})
			},
			
			'toggleFollow':function(brand_id){
				var Brand = this;
				return Brand.request({
					'method':'POST',
					'extra_url': '/brand/' + brand_id,
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