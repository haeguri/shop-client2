angular.module('radio.controller')

    .controller('IssueListCtrl', function($scope, Channel, $state, $location, $log, 
        $ionicHistory) {

        $scope.issue_list = {};
        $scope.issue_list.isTagView = false;
        $scope.issue_list.currentTag = {}

        var page = 1;
        var tag = $location.search().tag || undefined;
        var channel = $location.search().channel || undefined;
        var params = {
            'params': {
                'page':page,
                'tag':tag,
                'channel':channel
            }
        };

        $log.log('Ionic History View !!!', $ionicHistory.viewHistory());

        params.params.tag == undefined ? delete params.params.tag : undefined; 
        params.params.channel == undefined ? delete params.params.channel : undefined;

        Channel.getIssues(params).then(function(data) {
            if (data.results.length) {
                for(var i in data.results[0].hash_tags) {
                    if (data.results[0].hash_tags[i].id == tag) {
                        $scope.issue_list.currentTag = data.results[0].hash_tags[i];
                        console.log("$scope.issue_list.currentTag", $scope.issue_list.currentTag);
                    }
                }
                $scope.issue_list.issues = data.results;
            }
        })

        $scope.issue_list.goIssueDetail = function(issue_id) {
            $location.url('/main/issues/'+issue_id);
        }

        $scope.issue_list.goHashTagGlobal = function(tag, $event) {
            $event.stopPropagation();
            $location.url('/main/hashtag/issues?tag='+tag.id);
        }
    });