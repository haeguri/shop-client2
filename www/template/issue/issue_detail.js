angular.module('radio.controller')

	.controller('IssueDetailCtrl', function($scope, $location) {

        $scope.issue_detail = {};

        $scope.issue_detail.goIssueDetail = function() {
        	$location.url('/tabs/main/issues/2')
        }
})