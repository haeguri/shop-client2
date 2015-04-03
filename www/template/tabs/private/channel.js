angular.module('radio.controller')	

	.controller('PrivateChannelCtrl', function(Channel, $scope, $rootScope) {

		$scope.private_channel = {};

		$scope.private_channel.channelUnfollow = function(channel_id) {
			Channel.toggleFollow(channel_id).then(function(data) {
				$scope.user.follow_channels = data;
				$rootScope.$broadcast('ChannelListUpdate');
			});
		}

		$scope.private_channel.moveChannelTab = function() {
			$location.url('/tabs/channel');
		}
	});