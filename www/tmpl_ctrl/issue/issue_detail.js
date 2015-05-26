angular.module('radio.controller')

	.controller('IssueDetailCtrl', function(Channel, Like, $scope, $location, $rootScope,
        $stateParams, $ionicHistory, $log, $state) {

        $scope.issue_detail = {};

        var method = '';
        var url_pattern = '';

        var getIssue = function() {
            Channel.getIssue($stateParams.issue_id).then(function(data) {
                $scope.issue_detail.issue = data;
            })
        }

        // Issue Data 초기화 작업
        getIssue();

        $rootScope.$on('issue_detail_reload', function() {
            console.log("issue_detail_reload!");
            getIssue();
            $ionicHistory.clearCache();
        })

        $scope.issue_detail.goBack = function() {
        	$ionicHistory.goBack();
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
            }, function(data) {
                console.log("Like Falied! Reason : ", data);
            });
        }

        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        $scope.issue_detail.goProductDetail = function(product_id) {
            $state.go('tabs.' + url_pattern + '_product_detail', {'product_id':product_id})
        }

        $scope.issue_detail.goChannelDetail = function(channel_id) {
            $state.go('tabs.' + url_pattern + '_channel_detail', {'channel_id':channel_id})
        }

        $scope.issue_detail.goTagGlobalIssues = function(tag_id) {
            $state.go('tabs.' + url_pattern + '_tag_global', {'tag':tag_id, 'view':''})
        }
    });