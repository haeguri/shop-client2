angular.module('radio.controller')
	.controller('ChannelDetailCtrl', function(Channel, $location, 
		$rootScope, $scope, $stateParams, $ionicHistory) {

		$scope.channel_detail = {};

		Channel.getChannel($stateParams.channel_id).then(function(data){
			$scope.channel_detail.channel = data;
			console.log("channel", data);
		})

		$scope.channel_detail.goBack = function() {
			$ionicHistory.goBack();
		}

		$scope.channel_detail.testUrl = 'https://33.media.tumblr.com/avatar_17535d66418b_128.png';

		$scope.channel_detail.openCodyDetail = function(cody_id) {
			console.log("$stateParams.channel_id", $stateParams.channel_id);

			var main_tabs_pattern = /\/tabs\/main\//.exec($location.absUrl());
			var channel_tabs_pattern = /\/tabs\/channel\//.exec($location.absUrl());


			if(main_tabs_pattern != null) {
				$location.url('/tabs/main/channel/'+$stateParams.channel_id+'/cody/'+cody_id);
			}
			if(channel_tabs_pattern != null) {
				$location.url('/tabs/channel/'+$stateParams.channel_id+'/cody/'+cody_id);
			}
		}
	});