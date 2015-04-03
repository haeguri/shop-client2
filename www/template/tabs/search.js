angular.module('radio.controller')

	.controller('SearchCtrl', function(Channel, $scope) {
		$scope.saerch = {};

		Channel.getCodies({
			'params': {
				'reco':'shuffle'
			}
		}).then(function(data) {
			$scope.search.reco_codies = data;
		})
	});