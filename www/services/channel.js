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

			'getPubDays':function() {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url':'/pubdays'
				}).then(function(response) {
					return response.data;
				})
			},

			'getChannels':function(args) {
				var Channel = this;
				var params = args.params || {};
				return Channel.request({
					'method':'GET',
					'extra_url':'/channels',
					'params':params
				}).then(function(response){
					return response.data;
				})
			},

			'getChannel':function(args) {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url':'/channels/'+args.channel_id
				}).then(function(response){
					return response.data;
				})
			},

			'getIssues':function(args) {
				var Channel = this;
				var params = args.params || {};
				return Channel.request({
					'method':'GET',
					'extra_url':'/issues',
					'params':params
				}).then(function(response) {
					return response.data;
				})
			},
			'getIssue':function(issue_id) {
				var Channel = this;
				return Channel.request({
					'method':'GET',
					'extra_url': '/issues/' + issue_id
				}).then(function(response){
					return response.data;
				})
			}
		};

		return Channel;
	})