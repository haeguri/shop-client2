angular.module('radio.controller')

    .controller('ChannelDetailCtrl', function(Channel, Follow, $state, $scope, $stateParams,
    	$ionicHistory, $location, $log, $rootScope) {

        $scope.channel_detail = {};
        $scope.channel_detail.channel = {};
        var url_pattern = '';

        var getChannel = function() {
            Channel.getChannel({
                'channel_id':$stateParams.channel_id
            }).then(function(data) {
                $scope.channel_detail.channel = data;
                console.log("ChannelDetail data!", data);
            });
        }

        getChannel();

        $rootScope.$on('channel_detail_reload', function() {
            console.log("channel_detail_reload!");
            getChannel();
            $ionicHistory.clearCache();
        })

        $scope.channel_detail.goBack = function() {
        	$ionicHistory.goBack();
        }

        $scope.channel_detail.toggleFollow = function(event) {
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

        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        $scope.channel_detail.goTagSpecificIssues = function($event, channel_id, tag_id) {
            $event.stopPropagation();
            $state.go('tabs.' + url_pattern + '_tag_specific', {'tag':tag_id, 'owner':'channel', 'channel':channel_id});
        }

        $scope.channel_detail.goIssueDetail = function(issue_id) {
            $state.go('tabs.' + url_pattern + '_issue_detail', {'issue_id':issue_id});
        }

    })