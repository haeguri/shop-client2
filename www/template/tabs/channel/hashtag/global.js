angular.module('radio.controller')

	.controller('ChannelHashTagGlobalCtrl', function(Channel, $scope, $location, $log, 
		$ionicHistory) {

        $scope.tag_global = {};

        $scope.tag_global.queryTag = $location.search().tag;

		$scope.tag_global.addUnderline = function() {
			$scope.tag_global.queryTag = $location.search().tag;
			$(event.target).addClass('active');
			$(event.target).siblings('a').removeClass('active');
		}

})