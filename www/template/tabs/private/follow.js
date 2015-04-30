angular.module('radio.controller')

	.controller('PrivateFollowCtrl', function($scope, Brand, $log, $location) {

        $scope.private_follow = {};
        $scope.private_follow.currentView = '채널'

        $('div.two-button-bar.follow a.button:first-child').addClass('actived');

        var brand_page = 1;

        $scope.private_follow.toggleView = function(new_view) {
        	$(event.target).addClass('actived');
			$(event.target).siblings('a').removeClass('actived');
			$scope.private_follow.currentView = new_view;
        }

        $scope.private_follow.goChannelDetail = function(channel_id) {
            $location.url('/private/channels/'+channel_id);
        }

        $scope.private_follow.goBrandDetail = function(brand_id) {
            $location.url('/private/brands/'+brand_id);   
        }

        Brand.getFeeds({
            'params': {
                'page': brand_page
            }
        }).then(function(data) {
            $scope.private_follow.feeds = data.results;
        })

	});