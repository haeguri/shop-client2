angular.module('radio.controller')

    .controller('IssuesCtrl', function($scope, Channel, $state, $location) {

        var page = 0;

        $scope.main_issues = {};

        console.log("mainIntroIssue!!!");


        Channel.getIssues({
            'params': {
                    'page': ++page
            }
        }).then(function(data) {
            $scope.main_issues.issues = data.results;
        })

        $scope.main_issues.goIssueDetail = function(issue_id) {
            $location.url('/main/issues/'+issue_id);
        }

        $scope.main_issues.goHashTag = function(tag, channel, $event) {
            $event.stopPropagation();
            $location.url('/main/channel/'+channel.id+'/hashtag/'+tag.id+'/issues');
        }
    });