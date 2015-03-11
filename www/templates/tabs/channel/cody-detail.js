angular.module('radio.controller')

	.controller('ChannelCodyDetailCtrl', function(MediaUrl, Channel, $stateParams, $scope, $rootScope, $location) {

		$scope.cody_detail = {};

		$scope.cody_detail.mediaUrl = MediaUrl;

		Channel.getCody($stateParams.channel_id, $stateParams.cody_id).then(function(data) {
			$scope.cody_detail.cody = data;

			Channel.getChannel($stateParams.channel_id).then(function(data){
				$scope.cody_detail.channel = data;
			})
		});

		$scope.cody_detail.channelFollow = function() {
			Channel.toggleFollow($scope.cody_detail.channel.id).then(function(data) {
				$scope.user.follow_channels = data;
				//console.log
				//$rootScope.$broadcast('ChannelFollowUpdate');
				//$('#channel-follow-btn').
			})
		}

		$scope.cody_detail.codyFollow = function() {
			Channel.toggleCodyFollow($stateParams.channel_id, $stateParams.cody_id).then(function(data) {
				console.log("data", data);
				$scope.user.follow_codies = data;
			})
		}

		$scope.cody_detail.openShopDetail = function(product_id) {

			var main_tabs_pattern = /\/tabs\/main\//.exec($location.absUrl());
			var channel_tabs_pattern = /\/tabs\/channel\//.exec($location.absUrl());


			if(main_tabs_pattern != null) {
				$location.url('/tabs/main/product/'+product_id);
			}
			if(channel_tabs_pattern != null) {
				$location.url('/tabs/channel/product/'+product_id);
			}
		}
	});

