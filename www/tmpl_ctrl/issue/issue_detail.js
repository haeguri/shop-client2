angular.module('radio.controller')

	.controller('IssueDetailCtrl', function(Channel, Like, $scope, $location, $rootScope,
        $stateParams, $ionicHistory, $log, $state) {

        $scope.issue_detail = {};

        var method = '';
        var url_pattern = '';

        Channel.getIssue($stateParams.issue_id).then(function(data) {
        	$scope.issue_detail.issue = data;
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
                //$scope.issue_detail.issue.like === false ? $(event.target).addClass('true') : $(event.target).removeClass('true');
            });
        }

        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        $scope.issue_detail.goProductDetail = function(product_id) {
            $state.go('tabs.' + url_pattern + '_product_detail', {'product_id':product_id})
            // switch(url_pattern) {
            //     case 'main':
            //         $state.go('tabs.main_product_detail', {'product_id':product_id})
            //         break; 
            //     case 'channel':
            //         $state.go('tabs.channel_product_detail', {'product_id':product_id})
            //         break;
            //     case 'private':
            //         $state.go('tabs.private_product_detail', {'product_id':product_id})
            //         break;
            //     case 'search':
            //         $state.go('tabs.search_product_detail', {'product_id':product_id})
            //         break;
            // }
        }

        $scope.issue_detail.goChannelDetail = function(channel_id) {
            $state.go('tabs.' + url_pattern + '_channel_detail', {'channel_id':channel_id})
            // switch(url_pattern) {
            //     case 'main':
            //         $state.go('tabs.main_channel_detail', {'channel_id':channel_id})
            //         break; 
            //     case 'channel':
            //         $state.go('tabs.channel_channel_detail', {'channel_id':channel_id})
            //         break;
            //     case 'private':
            //         $state.go('tabs.private_channel_detail', {'channel_id':channel_id})
            //         break;
            //     case 'search':
            //         $state.go('tabs.search_channel_detail', {'channel_id':channel_id})
            //         break;
            // }
        }

        $scope.issue_detail.goTagGlobalIssues = function(tag_id) {
            $state.go('tabs.' + url_pattern + '_tag_global', {'tag':tag_id, 'view':''})
            // switch(url_pattern) {
            //     case 'main':
            //         $state.go('tabs.main_tag_global', {'tag':tag_id, 'view':''})
            //         break; 
            //     case 'channel':
            //         $state.go('tabs.channel_tag_global', {'tag':tag_id, 'view':''})
            //         break;
            //     case 'private':
            //         $state.go('tabs.private_tag_global', {'tag':tag_id, 'view':''})
            //         break;
            //     case 'search':
            //         $state.go('tabs.search_tag_global', {'tag':tag_id, 'view':''})
            //         break;
            // }   
        }
    });