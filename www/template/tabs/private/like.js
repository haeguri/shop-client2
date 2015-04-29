angular.module('radio.controller')

	.controller('PrivateLikeCtrl', function($scope, Product, $log, $rootScope) {

        $scope.private_like = {};

        $('div.two-button-bar.like a.button:first-child').addClass('actived');

        $scope.private_like.currentView = '이슈';

        $log.log('root user data', $rootScope.user);

       	$scope.private_like.toggleView = function(new_view) {
	    	$(event.target).addClass('actived');
			$(event.target).siblings('a').removeClass('actived');
			$scope.private_like.currentView = new_view;
        }
	});