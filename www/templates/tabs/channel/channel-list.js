angular.module('radio.controller')
	.controller('ChannelListCtrl', function(MediaUrl, Channel, $location, $rootScope, $scope) {

		$scope.channel_list = {};

		$scope.channel_list.mediaUrl = MediaUrl;

		Channel.query('channel').then(function(data) {
			$scope.channel_list.channels = data;
		})

		$scope.channel_list.openCodyList = function(channel_id) {
			$location.url('/tabs/channel/'+ channel_id+'/cody');
		}

		$scope.channel_list.channelFollow = function(channel_id) {
			Channel.toggleFollow(channel_id).then(function(data) {
				$scope.user.follow_channels = data;
				Channel.query($scope.user.id).then(function(data){
					$scope.channel_list.channels = data;
				})
				$rootScope.$broadcast('UserDataRefresh');
				$rootScope.$broadcast('ChannelFollowUpdate');
			});
		}

		$scope.$on('ChannelListUpdate', function() {
			Channel.query($scope.user.id).then(function(data){
				$scope.channel_list.channels = data;
				console.log("ChannelListUpdate", data);
			})
			console.log("ChannelListUpdate")
		})
	});