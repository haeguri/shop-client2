angular.module('radio.controller')

	.controller('IssueDetailCtrl', function(Channel, $scope, $location, $stateParams, $ionicHistory) {

        $scope.issue_detail = {};

        Channel.getIssue($stateParams.issue_id).then(function(data) {
        	console.log("issue_detail", data);
        	$scope.issue_detail.issue = data;
        })

        $scope.issue_detail.goBack = function() {
        	$ionicHistory.goBack();
        }

        $scope.issue_detail.test = function() {
        	console.log("clicked");
        }
})