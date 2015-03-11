angular.module('radio.controller')

	.controller('MainCtrl', function(MediaUrl, Channel, $scope, $location) {

        $scope.main = {};

        $scope.main.mediaUrl = MediaUrl;
        
        $scope.main.openMainEdit = function() {
            $location.url('/tabs/main/edit');
        }

        $scope.main.openMainNotify = function() {
            $location.url('/tabs/main/notify');
        }

        $scope.main.openCodyList = function(channel_id) {
            $location.url('/tabs/main/channel/'+channel_id+'/cody');
        }

        $scope.main.openChannelTab = function() {
            $location.url('/tabs/channel');
        }
});