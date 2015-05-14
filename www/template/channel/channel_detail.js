angular.module('radio.controller')

    .controller('ChannelDetailCtrl', function(Channel, Follow, $state, $scope, $stateParams,
    	$ionicHistory, $location, $log) {

        $scope.channel_detail = {};
        $scope.channel_detail.channel = {};
        var url_pattern = '';

        Channel.getChannel({
        	'channel_id':$stateParams.channel_id
        }).then(function(data) {
        	$scope.channel_detail.channel = data;
            console.log("ChannelDetail data!", data);
        });

        $scope.channel_detail.goBack = function() {
        	$ionicHistory.goBack();
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

        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        $scope.channel_detail.goTagSpecificIssues = function($event, channel_id, tag_id) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_tag_specific', {'tag':tag_id, 'owner':'channel', 'channel':channel_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_tag_specific', {'tag':tag_id, 'owner':'channel', 'channel':channel_id});
                    break;
                case 'private':
                    $state.go('tabs.private_tag_specific', {'tag':tag_id, 'owner':'channel', 'channel':channel_id});
                    break;
                case 'search':
                    $state.go('tabs.search_tag_specific', {'tag':tag_id, 'owner':'channel', 'channel':channel_id});
                    break;
            }   
        }

        $scope.channel_detail.goIssueDetail = function(issue_id) {
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_issue_detail', {'issue_id':issue_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_issue_detail', {'issue_id':issue_id});
                    break;
                case 'private':
                    $state.go('tabs.private_issue_detail', {'issue_id':issue_id});
                    break;
                case 'search':
                    $state.go('tabs.search_issue_detail', {'issue_id':issue_id});
                    break;
            }
        }

    })