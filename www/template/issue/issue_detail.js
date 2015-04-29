angular.module('radio.controller')

	.controller('IssueDetailCtrl', function(Channel, Like, $scope, $location, $rootScope,
        $stateParams, $ionicHistory, $log) {

        $scope.issue_detail = {};

        var method = '';

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

        $scope.issue_detail.toggleLike = function(event) {
            method = $scope.issue_detail.issue.like === false ? 'POST' : 'DELETE';
            Like.toggleIssueLike({
                    'method':method,
                    'issue_id':$scope.issue_detail.issue.id
            }).then(function(data) {
                if ($scope.issue_detail.issue.like === false) {
                    $scope.issue_detail.issue.like = true;
                    $(event.target).addClass('true').removeClass('false');
                    $log.log("add");
                } else {
                    $scope.issue_detail.issue.like = false;
                    $(event.target).removeClass('true').addClass('false');
                    $log.log("remove");
                }
                //$scope.issue_detail.issue.like === false ? $(event.target).addClass('true') : $(event.target).removeClass('true');
            });
        }

    });