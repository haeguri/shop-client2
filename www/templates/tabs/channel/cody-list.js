angular.module('radio.controller')
	.controller('ChannelCodyListCtrl', function(MediaUrl, Channel, $location, $rootScope, $scope, $stateParams) {

		$scope.channel_cody_list = {};
		$scope.channel_cody_list.mediaUrl = MediaUrl;

		Channel.getCodies($stateParams.channel_id).then(function(data){
			$scope.channel_cody_list.codies = data;
		})

		console.log("ChannelCody!");

		$scope.channel_cody_list.openCodyDetail = function(cody_id) {
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