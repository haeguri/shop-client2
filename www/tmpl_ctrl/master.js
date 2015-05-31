angular.module('radio.controller', [])

	.controller('MasterCtrl', function($scope, $rootScope,$state, $stateParams, 
		$ionicHistory, $ionicLoading, RadioAuth, $q, $timeout, $ionicPopup) {

		var timeoutRequest;

	    $rootScope.$on('loading:show', function(event, config) {
	    	var url_pattern = /^http:\/\//.exec(config.url)
	    	if(url_pattern != undefined) {
	    		console.log("config", config);
	    		timeoutRequest = $timeout(function() {
		    		$ionicPopup.alert({
			          title: '네트워크 연결 오류',
			          template: '<p align="center">네트워크 연결상태를 확인 해주세요.</p>',
			          okText: '확인',
			          okType: 'button-dark'
			        });
				}, 5000)
	    	}
	      $ionicLoading.show({template: 'Loading'});
	    });

	    $rootScope.$on('loading:hide', function(event, response) {
	    	$timeout.cancel(timeoutRequest);
	    	$ionicLoading.hide();
	    });

		$scope.$on('LoginRequired', function(toStateName) {
			$state.go('login');
			console.log("LoginRequired");
			$rootScope.lastStateName = $state.current.name;
			$rootScope.lastStateParams = {};
			for (var attr in $stateParams) {
				$rootScope.lastStateParams[attr] = $stateParams[attr];
			}
			console.log("$rootScope.lastStateName", $rootScope.lastStateName);
			console.log("$rootScope.lastStateParams", $rootScope.lastStateParams);
		})

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	        if (fromState.name == 'login' && toState.name != 'signup' && toState.name != 'tabs.private') {
				var state_pattern = /^tabs.main$|issue_detail|product_detail|channel_detail|brand_detail/.exec(toState.name)[0];
				$rootScope.$broadcast(state_pattern+'_reload');
			}
 	  	});

	});