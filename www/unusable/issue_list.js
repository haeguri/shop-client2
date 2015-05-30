angular.module('radio.controller')

    .controller('IssueListCtrl', function($scope, Channel, $state, $location, $log, 
        $ionicHistory) {

        $scope.issue_list = {};
        $scope.issue_list.isTagView = false;
        $scope.issue_list.currentTag = {}

        var page = 1;
        var url_pattern = '';
        var tag = $location.search().tag || undefined;
        var channel = $location.search().channel || undefined;
        var params = {
            'params': {
                'page':page,
                'tag':tag,
                'channel':channel
            }
        };

        params.params.tag == undefined ? delete params.params.tag : undefined; 
        params.params.channel == undefined ? delete params.params.channel : undefined;

        Channel.getIssues(params).then(function(data) {
            if (data.results.length) {
                for(var i in data.results[0].hash_tags) {
                    if (data.results[0].hash_tags[i].id == tag) {
                        $scope.issue_list.currentTag = data.results[0].hash_tags[i];
                    }
                }
                $scope.issue_list.issues = data.results;
            }
        })
        
        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        $scope.issue_list.goIssueDetail = function(issue_id) {
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

        $scope.issue_list.goChannelDetail = function(channel_id, $event) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_channel_detail', {'channel_id':channel_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_channel_detail', {'channel_id':channel_id});
                    break;
                case 'private':
                    $state.go('tabs.private_channel_detail', {'channel_id':channel_id});
                    break;
                case 'search':
                    $state.go('tabs.search_channel_detail', {'channel_id':channel_id});
                    break;
            }
        }

        $scope.issue_list.goTagGlobalIssues = function(tag_id, $event) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_tag_global', {'tag':tag_id, 'view':'issues'});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_tag_global', {'tag':tag_id, 'view':'issues'});
                    break;
                case 'private':
                    $state.go('tabs.private_tag_global', {'tag':tag_id, 'view':'issues'});
                    break;
                case 'search':
                    $state.go('tabs.search_tag_global.', {'tag':tag_id, 'view':'issues'});
                    break;
            }
        }
    });