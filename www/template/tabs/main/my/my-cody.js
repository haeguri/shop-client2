angular.module('radio.controller')
	.controller('MyCodyCtrl', function(Channel, $location, $rootScope, $scope, $stateParams) {

		$scope.my_cody = {};

		$scope.my_cody.openCodyDetail = function(channel_id, cody_id) {
			$location.url('/tabs/main/channel/'+channel_id+'/cody/'+cody_id);
		}
	});