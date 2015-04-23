angular.module('radio.controller')

	.controller('HashTagCtrl', function(Channel, $scope, $location, $stateParams) {

        $scope.hash_tag = {};

        $scope.hash_tag.isOwnerChannel = $stateParams.channel_id;
        $scope.hash_tag.currentContents = 'issue';
        $scope.hash_tag.menuList = ['이슈', '상품'];

        var page = 0;
        var params = {};
        if (!$stateParams.channel_id) {
            params = {
                'page':++page,
                'tag':$stateParams.tag_id
            };
        } else {
            params = {
                'page':++page,
                'channel':$stateParams.channel_id,
                'tag':$stateParams.tag_id
            };
        }

        Channel.getIssues({'params':params}).then(function(data) {
        	$scope.hash_tag.issues = data.results;
        	angular.forEach(data.results[0].hash_tags, function(tag) {
        		if ($stateParams.tag_id == tag.id ) {
        			$scope.hash_tag.currentTag = tag;
        		}   
        	})
        	console.log("data",data);
        })
        $scope.hash_tag.goHashTagGlobal = function(tag) {
            $location.url('/tabs/main/hashtag/'+tag.id);
        }

        $scope.hash_tag.goHashTag = function(tag, channel, $event) {
        	$event.stopPropagation();
            $location.url('/tabs/main/channel/'+channel.id+'/hashtag/'+tag.id);
        }

        $scope.hash_tag.goIssueDetail = function(issue_id) {
                $location.url('/tabs/main/issues/'+issue_id);
        }

        $scope.hash_tag.toggleInfo = function($event, menu){
            if($scope.hash_tag.currentContents != menu) {
                $(event.target).addClass('active');
                $(event.target).siblings().removeClass('active');
            }
        }

})