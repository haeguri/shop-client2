angular.module('radio.controller')

	.controller('MainIntroCtrl', function($scope, $location, $state) {

        $scope.main_intro = {};

        $scope.main_intro.current_contents = 'issues';


        $scope.main_intro.toggleContents = function() {
                console.log("clicked")
        	if ($scope.main_intro.current_contents=='issues') {
        		$scope.main_intro.current_contents = 'products';
        		//$location.url('/tabs/main/issues');
        	} else {
        		$scope.main_intro.current_contents = 'issues';
        		//$location.url('/tabs/main/products');
        	}
        }
})