angular.module('radio.controller')

    .controller('ChannelDetailCtrl', function(Channel, $scope, $stateParams,
    	$ionicHistory, $location) {

        $scope.channel_detail = {};

        Channel.getChannel({
        	'channel_id':$stateParams.channel_id
        }).then(function(data) {
        	$scope.channel_detail.channel = data;
        	console.log("data", data);
        })

        $scope.channel_detail.goBack = function() {
        	$ionicHistory.goBack();
        }

        $scope.channel_detail.goIssueDetail = function(issue_id) {
        	$location.url('/main/issues/'+issue_id);
        }

    })