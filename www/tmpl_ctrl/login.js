angular.module('radio.controller')
	.controller('LoginCtrl', function(RadioAuth, $scope, $rootScope, $ionicPopup, 
		$state, $http, $cookies, RadioUtil, $ionicHistory){

		$scope.login = {};

		$scope.login.requestLogin = function() {
			$scope.login.info_msg = '';
			if ($scope.login.username == '' && $scope.login.password == '') {
				$scope.login.alert_msg = '아이디와 비밀번호가 필요합니다.';
			} else if ($scope.login.username == '') {
				$scope.login.alert_msg = '아이디가 입력되지 않았습니다.';
			} else if ($scope.login.password == '') {
				$scope.login.alert_msg = '비밀번호가 입력되지 않았습니다.';
			} else {
				RadioAuth.login(
					$scope.login.username,
					$scope.login.password
				).then(function(data) {
					$scope.login.username = '';
					$scope.login.password = '';

					// 서버에서 request의 user를 확인하기 위함
					$http.defaults.headers.common.Authorization = 'Token ' + data.key;
	                $cookies.token = data.key;

	                // services/auth.js 의 RadioAuth로 부터 넘어오는 data의 포멧은 아래와 같음.
					// data = {'key':some_key_value, 'user':user_primary_key} 
					RadioAuth.getUser(data.user).then(function(data) {
						$rootScope.user = {
			                'id': data.id,
			                'username' : data.username,
			                'products' : data.product_likes_of_user,
			                'issues': data.issue_likes_of_user,
			                'channels' : data.channel_follows_of_user,
			                'brands' : data.brand_follows_of_user
			            };

			            // if (RadioUtil.isEmpty($rootScope.lastStateParams) === true && $rootScope.lastStateName == 'tabs.private.follow') {
			            // 	$state.go($rootScope.lastStateName);
			            //} 
			            if (RadioUtil.isEmpty($rootScope.lastStateParams) === true) {
							$state.go($rootScope.lastStateName);
						} else {
							$state.go($rootScope.lastStateName, $rootScope.lastStateParams);
						}
					});
				}, function(reason) {
					console.log("Failed Login", reason);
					$scope.login.username = '';
					$scope.login.password = '';
					$rootScope.$broadcast('loading:hide');
					if (reason.hasOwnProperty('non_field_errors')) {
						$scope.login.alert_msg = '아이디 혹은 비밀번호가 잘못 입력됐습니다.'
					}
				});
			}	
		}

		$rootScope.$on('SignUpAllowed', function(event, data) {
			$state.go('login');
			$scope.login.alert_msg = '';
			$scope.login.username = data.username;
			$scope.login.info_msg = '등록완료! 이제 로그인을 해주세요.';
		})

		$scope.login.window_width = $(window).width();
	});