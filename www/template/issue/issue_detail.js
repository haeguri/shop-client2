angular.module('radio.controller')

	.controller('IssueDetailCtrl', function(Channel, Like, $scope, $location, $rootScope,
        $stateParams, $ionicHistory, $log) {

        $scope.issue_detail = {};

        var method = '';
        var url_pattern = '';

        Channel.getIssue($stateParams.issue_id).then(function(data) {
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

        url_pattern = /\/\#\/main\/|\/\#\/channel\/|\/#\/private\/|\/#\/search\//.exec($location.absUrl())[0];

        $scope.issue_detail.goProductDetail = function(product_id) {
            switch(url_pattern) {
                case '/#/main/':
                    $location.url('/main/products/'+product_id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/products/'+product_id);
                    break;
                case '/#/private/':
                    $location.url('/private/products/'+product_id);
                    break;
                case '/#/search/':
                    $location.url('/search/products/'+product_id);
                    break;
            }
        }

        $scope.issue_detail.goChannelDetail = function(channel_id) {
            $log.log("goChannelDetail", channel_id);
            switch(url_pattern) {
                case '/#/main/':
                    $location.url('/main/channels/'+channel_id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/channels/'+channel_id);
                    break;
                case '/#/private/':
                    $location.url('/private/channels/'+channel_id);
                    break;
                case '/#/search/':
                    $location.url('/search/channels/'+channel_id);
                    break;
            }
        }

        $scope.issue_detail.goHashTagGlobal = function(tag_id) {
            switch(url_pattern) {
                case '/#/main/':
                    $location.url('/main/hashtag/issues?tag='+tag_id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/hashtag/issues?tag='+tag_id);
                    break;
                case '/#/private/':
                    $location.url('/private/hashtag/issues?tag='+tag_id);
                    break;
                case '/#/search/':
                    $location.url('/search/hashtag/issues?tag='+tag_id);
                    break;
            }   
        }

    });