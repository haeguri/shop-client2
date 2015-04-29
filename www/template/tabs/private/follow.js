angular.module('radio.controller')

	.controller('PrivateFollowCtrl', function($scope, $log, Brand) {

        $scope.private_follow = {};
        $scope.private_follow.currentView = '채널'

        $('div.two-button-bar.follow a.button:first-child').addClass('actived');

        var brand_page = 1;


        $scope.private_follow.toggleView = function(new_view) {
        	$(event.target).addClass('actived');
			$(event.target).siblings('a').removeClass('actived');
			$scope.private_follow.currentView = new_view;
        }

        Brand.getFeeds({
            'params': {
                'page': brand_page
            }
        }).then(function(data) {
            $scope.private_follow.feeds = data.results;
        })

	});