angular.module('radio.controller')

	.controller('ChannelIntroCtrl', function(Channel, $scope, $location) {

        $scope.channel_intro = {};

        $scope.channel_intro.goIssueDetail = function() {
        	$location.url('/tabs/main/issues/2')
        }
})