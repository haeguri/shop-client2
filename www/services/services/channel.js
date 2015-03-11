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
			'getAllCody':function() {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url': '/channel/cody/',
				}).then(function(response){
					return response.data;
				});
			},
			'getChannels':function(){
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url':'/channel/'
				}).then(function(response){
					return response.data;
				});
			},
			'getChannel':function(channel_id) {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url': '/channel/' + channel_id
				}).then(function(response){
					return response.data;
				});
			},
			'toggleFollow':function(channel_id) {
				var Channel = this;
				return Channel.request({
					'method':'POST',
					'extra_url': '/channel/' + channel_id,
					'params':{
						'user_id':RadioAuth.user.id
					}
				}).then(function(response) {
					return response.data;
				})
			},
			'getCodies':function(channel_id) {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url': '/channel/' + channel_id + '/cody/'
				}).then(function(response){
					console.log("response", response);
					return response.data;
				})
			},
			'getCody':function(channel_id, cody_id) {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url':'/channel/' + channel_id + '/cody/' + cody_id
				}).then(function(response){
					return response.data;
				})
			},
			'toggleCodyFollow':function(channel_id, cody_id){
				var Channel = this;
				return Channel.request({
					'method':'POST',
					'extra_url':'/channel/' + channel_id + '/cody/' + cody_id,
					'params':{
						'user_id':RadioAuth.user.id
					}
				}).then(function(response){
					return response.data;
				})
			},
			'current_channel' : {
				/* temporary variable */
			}

		};

		return Channel;
	})