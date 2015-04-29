angular.module('radio.controller')

	.controller('ChannelIntroCtrl', function(Channel, $scope, $location,
		$ionicSlideBoxDelegate, $timeout) {

        $scope.channel_intro = {};

        $scope.channel_intro.menus = [];

        var currentMenu = 'New';

		Channel.getPubDays().then(function(data){
			$scope.channel_intro.pub_days = data;
			$timeout(function() {
				$ionicSlideBoxDelegate.update();
			})
		});

	});