angular.module('radio.service')
	.factory('Channel', function(RootUrl, RadioAuth, $http) {
		var Channel = {
			'request':function(args) {
				var Channel = this;
				var extra_url = args.extra_url || '';
				var API_URL = RootUrl + extra_url;
				var method = args.method;
				var data = args.data || {};
				var params = args.params || {};
				return $http({
					'url': API_URL,
					'method':method,
					'data':data,
					'params':params
				}).success(function(response){

				}).error(function(response){
					console.log("error!!", response);
				})
			},
			'getCodies':function(args) {
				var Channel = this;
				if(args != undefined) {
					var params = args.params || {};
				}
				return Channel.request({
					'method':'GET',
					'extra_url':'/codies',
					'params':params
				}).then(function(response) {
					return response.data;
				})
			},
			'getCodiesOfCategory':function(category_id){
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url':'/cody-categories/'+category_id+'/codies',
				}).then(function(response){
					return response.data;
				})
			},
			'getCody':function(channel_id, cody_id) {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url':'/channels/' + channel_id + '/codies/' + cody_id
				}).then(function(response){
					return response.data;
				})
			}
		};

		return Channel;
	})