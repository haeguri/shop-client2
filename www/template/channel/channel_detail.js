angular.module('radio.controller')

    .controller('ChannelDetailCtrl', function(Channel, Follow, $scope, $stateParams,
    	$ionicHistory, $location, $log) {

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

        $scope.channel_detail.goHashTagSpecific = function($event, channel, tag) {
            $event.stopPropagation();
            $location.url('/main/specific/hashtag/issues?tag='+tag.id+'&channel='+channel.id);
        }

        $scope.channel_detail.toggleFollow = function(event) {
            //event.stopPropagation();
            method = $scope.channel_detail.channel.follow === false ? 'POST' : 'DELETE';
            Follow.toggleChannelFollow({
                    'method':method,
                    'channel_id':$scope.channel_detail.channel.id
            }).then(function(data) {
                if ($scope.channel_detail.channel.follow === false) {
                    $scope.channel_detail.channel.follow = true;
                    $log.log("channel follow");
                } else {
                    $scope.channel_detail.channel.follow = false;
                    $log.log("channel unfollow");
                }
            });
        }

    })