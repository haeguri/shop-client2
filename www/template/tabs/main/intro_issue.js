angular.module('radio.controller')

	.controller('MainIntroIssueCtrl', function($scope, Channel, $state, $location) {

	var page = 0;

        $scope.main_intro_issue = {};

        console.log("mainIntroIssue!!!");


        Channel.getIssues({
        	'params': {
        		'page': ++page
        	}
        }).then(function(data) {
        	$scope.main_intro_issue.issues = data.results;
        })

        $scope.main_intro_issue.goIssueDetail = function(issue_id) {
                $location.url('/tabs/main/issues/'+issue_id);
        }

        $scope.main_intro_issue.goHashTag = function(tag, channel, $event) {
                $event.stopPropagation();
                $location.url('/tabs/main/channel/'+channel.id+'/hashtag/'+tag.id);
        }
})