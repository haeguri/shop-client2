angular.module('radio.controller')
	.controller('ChannelIntroCtrl', function(MediaUrl, Channel, $location, $rootScope, $scope) {
		
		$scope.channel_intro = {};
		$scope.channel_intro.mediaUrl = MediaUrl;

		Channel.getAllCody().then(function(data){
			$scope.channel_intro.cody_list = data;
		})

		$scope.channel_intro.openCodyDetail = function(channel_id, cody_id) {
			$location.url('/tabs/channel/'+channel_id+'/cody/'+cody_id);
		}

		$scope.$on('ChannelListUpdate', function() {
			Channel.getAllCody().then(function(data){
				$scope.channel_intro.cody_list = data;
			})
			console.log("ChannelListUpdate");
		});
	});