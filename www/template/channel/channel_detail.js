angular.module('radio.controller')

    .controller('ChannelDetailCtrl', function(Channel, Follow, $scope, $stateParams,
    	$ionicHistory, $location, $log) {

        $scope.channel_detail = {};
        $scope.channel_detail.channel = {};
        var url_pattern = '';

        Channel.getChannel({
        	'channel_id':$stateParams.channel_id
        }).then(function(data) {
        	$scope.channel_detail.channel = data;
        });

        $scope.channel_detail.goBack = function() {
        	$ionicHistory.goBack();
        }

        url_pattern = /\/\#\/main\/|\/\#\/channel\/|\/#\/private\/|\/#\/search\//.exec($location.absUrl())[0];

        $scope.channel_detail.goHashTagSpecific = function($event, channel, tag) {
            $event.stopPropagation();
            switch(url_pattern) {
                case '/#/main/':
                    $location.url('/main/specific/hashtag/issues?tag='+tag.id+'&channel='+channel.id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/specific/hashtag/issues?tag='+tag.id+'&channel='+channel.id);
                    break;
                case '/#/private/':
                    $location.url('/private/specific/hashtag/issues?tag='+tag.id+'&channel='+channel.id);
                    break;
                case '/#/search/':
                    $location.url('/search/specific/hashtag/issues?tag='+tag.id+'&channel='+channel.id);
                    break;
            }
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

        $scope.channel_detail.goIssueDetail = function(issue_id) {
            switch(url_pattern) {
                case '/#/main/':
                    $location.url('/main/issues/'+issue_id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/issues/'+issue_id);
                    break;
                case '/#/private/':
                    $location.url('/private/issues/'+issue_id);
                    break;
                case '/#/search/':
                    $location.url('/search/issues/'+issue_id);
                    break;
            }
        }

    })