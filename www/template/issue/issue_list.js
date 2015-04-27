angular.module('radio.controller')

    .controller('IssueListCtrl', function($scope, Channel, $state, $location) {

        $scope.issue_list = {};
        $scope.issue_list.isTagView = false;
        $scope.issue_list.currentTag = {}

        console.log("Main Issue List!!!");

        var page = 0;
        var hashtag = $location.search().tag
        var params = {};

        if (hashtag == undefined) {
            params = {
                'params': {
                    'page':++page
                }
            };
            $scope.issue_list.isTagView = false;
        }else {
            params = {
                'params': {
                    'page':++page,
                    'tag':hashtag
                }
            };
            $scope.issue_list.isTagView = true;
        }

        Channel.getIssues(params).then(function(data) {
            if (data.results.length) {
                for(var i in data.results[0].hash_tags) {
                    if (data.results[0].hash_tags[i].id == hashtag) {
                        $scope.issue_list.currentTag = data.results[0].hash_tags[i];
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