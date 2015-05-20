angular.module('radio.controller')

	.controller('PrivateInfoCtrl', function($scope, Product, $log, $rootScope, $state) {

        $scope.private_info = {};

        //$('div.two-button-bar.like a.button:first-child').addClass('actived');

        $scope.private_info.currentView = '이슈';

       	$scope.private_info.toggleView = function(new_view) {
	    	$(event.target).addClass('actived');
			$(event.target).siblings('a').removeClass('actived');
			$scope.private_info.currentView = new_view;
        }

        $scope.private_info.goIssueDetail = function(issue_id) {
            $state.go('tabs.private_issue_detail', {'issue_id':issue_id});
        }

        $scope.private_info.goProductDetail = function(product_id) {
            $state.go('tabs.private_product_detail', {'product_id':product_id}); 
        }
	});