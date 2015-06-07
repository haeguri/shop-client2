angular.module('radio.controller')
	.controller('LoginCtrl', function(RadioAuth, $scope, $rootScope, $ionicPopup, 
		$state, $http, $cookies, RadioUtil, $ionicHistory, $rootScope, $http
		, $cordovaOauth, $localStorage, RootUrl){

		$scope.login = {};

		$scope.login.requestLogin = function() {
			$scope.login.info_msg = '';
			if ($scope.login.email == '' && $scope.login.password == '') {
				$scope.login.alert_msg = '이메일과 비밀번호가 필요합니다.';
			} else if ($scope.login.email == '') {
				$scope.login.alert_msg = '이메일이 입력되지 않았습니다.';
			} else if ($scope.login.password == '') {
				$scope.login.alert_msg = '비밀번호가 입력되지 않았습니다.';
			} else {
				// if($rootScope.storage.AUTO_LOGIN === true) {
				// 	$rootScope.storage.NICKNAME = $scope.login.username;
				// 	$rootScope.storage.PASSWORD = $scope.login.password;
				// }
				RadioAuth.login(
					$scope.login.email,
					$scope.login.password
				).then(function(data) {
					console.log("Success!", data);
					$http.defaults.headers.common.Authorization = 'Token ' + data.key;
	                $cookies.token = data.key;

	                // services/auth.js 의 RadioAuth로 부터 넘어오는 data의 포멧은 아래와 같음.
					// data = {'key':some_key_value, 'user':user_primary_key} 

					// RadioAuth.getUser(data.user).then(function(data){
					// 	RadioAuth.setUserData(data);
					// 	if ($rootScope.lastStateName != undefined) {
					// 		$state.go($rootScope.lastStateName, $rootScope.lastStateParams);
					// 	}
					// });
				}, function(reason) {
					console.log("login denied", reason);
					$rootScope.$broadcast('LoginDenied', reason);
				});
			}	
		}
		$scope.login.callAPI = function() {
			$http({
        		'url':'https://graph.facebook.com/v2.3/me?fields=id,name',
        		'method':'GET',
        		'params': {
        			'access_token':$localStorage.accessToken
        		}
			}).then(function(response) {
				RadioUtil.log("Success Facebook API Call!", response.data);
			}, function(data) {
				RadioUtil.log("Failed Facebook API Call", response.data);
			})
		};

		$scope.login.requestToServer = function() {
			console.log("localSotrage", JSON.stringify($localStorage.accessToken));
			$http({
            	'url':RootUrl+'/rest-auth/facebook/',
            	'method':'POST',
            	'data':{
            		'access_token':$localStorage.accessToken
            	}
            }).success(function(response) {
            	console.log("Facebook Login Success!!");
            	console.log(JSON.stringify(response));
            }).error(function(response){
            	console.log("response", response);
            });
		}

		$scope.login.requestFBLogin = function() {
	        $cordovaOauth.facebook("699901886786183", ["email", "read_insights", "read_stream"])
	        .then(function(result) {
	            $localStorage.accessToken = result.access_token;
	            for(var i in result) {
	            	console.log(i, result[i]);
	            }
	        }, function(error) {
	            console.log("Facebook Login Failed", error);
	        });
		};

		$scope.login.passwordChange = function() {
			$ionicPopup.show({
			    template: '<input type="password" ng-model="login.password_change_1"> <br> <input type="password" ng-model="login.password_change_2">',
			    title: '비밀번호 변경하기',
			    subTitle: '새로운 비밀번호를 입력해주세요.',
			    scope: $scope,
			    buttons: [
				  { text: 'Cancel' },
				  {
				    text: '<b>Save</b>',
				    type: 'button-positive',
				    onTap: function(e) {
				      if (!$scope.login.password_change_1 && !$scope.login.password_change_2) {
				        e.preventDefault();
				      } else if ($scope.login.password_change_1 != $scope.login.password_change_2) {
				      	e.preventDefault();
				      } else {
				        return {
				        	'password1':$scope.login.password_change_1,
				        	'password2':$scope.login.password_change_2
				        }
				      }
				    }
				  }
		    	]
		  	}).then(function(res) {
		  		if(res) {
		  			RadioAuth.passwordChange(res.password1,res.password2)
		  			.then(function(response) {
		  				console.log("Password Reset Success", JSON.stringify(response));
		  			}, function(reason) {
		  				console.log("Password Reset Failed", JSON.stringify(reason));
		  			})
		  		};
		  	});
		}

		$scope.login.passwordReset = function() {
			$ionicPopup.show({
			    template: '<input type="email" ng-model="login.pw_reset_email">',
			    title: '비밀번호 재설정',
			    subTitle: '이메일을 입력해주세요.',
			    scope: $scope,
			    buttons: [
				  { text: 'Cancel' },
				  {
				    text: '<b>Save</b>',
				    type: 'button-positive',
				    onTap: function(e) {
				      if (!$scope.login.pw_reset_email) {
				        e.preventDefault();
				      } else {
				        return {
				        	'email':$scope.login.pw_reset_email
				        }
				      }
				    }
				  }
		    	]
		  	}).then(function(res) {
		  		if(res) {
		  			RadioAuth.passwordReset(res.email)
		  			.then(function(response) {
		  				RadioUtil.log("Password Reset Success!", response)
		  			}, function(response) {
		  				RadioUtil.log("Password Reset Failed", response);
		  			})
		  		}
		  	});

		}

		$scope.login.goBack = function() {
			$state.go('tabs.main');
		}

		$rootScope.$on('LoginDenied', function(event, data) {
			$scope.login.email = '';
			$scope.login.password = '';
			$rootScope.$broadcast('loading:hide');
			if (data.hasOwnProperty('non_field_errors')) {
				$scope.login.alert_msg = '닉네임 혹은 비밀번호가 잘못 입력됐습니다.'
			}
		})

		$rootScope.$on('SignUpAllowed', function(event, data) {
			$state.go('login');
			$scope.login.alert_msg = '';
			$scope.login.email = data.email;
			$scope.login.info_msg = '등록완료! 이제 로그인을 해주세요.';
		})

		$scope.login.window_width = $(window).width();
	});