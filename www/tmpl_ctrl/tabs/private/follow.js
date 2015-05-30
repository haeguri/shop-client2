angular.module('radio.controller')

	.controller('PrivateFollowCtrl', function($scope, Brand, $log, $state, $rootScope, $ionicScrollDelegate) {

        $scope.private_follow = {};
        $scope.private_follow.currentView = '채널'

        $('div.two-button-bar.follow a.button:first-child').addClass('actived');

        var feed_page = 1;

        var getFeeds = function(page) {
            Brand.getFeeds({
                'params': {
                    'page': page
                }
            }).then(function(data) {
                $scope.private_follow.feeds = data.results;
            })
        }

        if ($rootScope.user != undefined) {
            getFeeds(1);
        }

        $scope.private_follow.toggleView = function(new_view) {
        	$(event.target).addClass('actived');
			$(event.target).siblings('a').removeClass('actived');
			$scope.private_follow.currentView = new_view;
        }

	});