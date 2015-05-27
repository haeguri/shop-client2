angular.module('radio.service', [])

	.factory('RadioAuth', function(RootUrl, $http, $q, $cookies, $location, $rootScope, 
		$log, $location, RadioUtil, $state) {

		var RadioAuth = {
	        'authenticated': false,
	        'request':function(args) {
	        	var deferred = $q.defer();
	            $http({
	                url : RootUrl + args.url,
	                method : args.method || {},
	                params : args.params || {},
	                data : args.data || {}
	            }).success(function(data, status, headers, config){
	            	deferred.resolve(data);
	            }).error(function(data, status, headers, config){
	                deferred.reject(data);
	            });

	            return deferred.promise;
	        },
	        'setUserData':function(data) {
	        	$rootScope.user = {
	                'id': data.id,
	                'username' : data.username,
	                'products' : data.product_likes_of_user,
	                'issues': data.issue_likes_of_user,
	                'channels' : data.channel_follows_of_user,
	                'brands' : data.brand_follows_of_user
	            };
	        },
	        'getUser':function(id) {
	        	var RadioAuth = this;
	        	return RadioAuth.request({
        			'method':'GET',
        			'url': '/users/' + id
        		}).then(function(data) {
					RadioAuth.setUserData(data);
					// 사용자 데이터를 reload하고 나서 redirect할 수 있도록
					// reload 하는 경우 -> 1. private 페이지 진입 시 2. 로그인 후
					/*
		            if (RadioUtil.isEmpty($rootScope.lastStateParams) === true) {
						$state.go($rootScope.lastStateName);
					} else {
						$state.go($rootScope.lastStateName, $rootScope.lastStateParams);
					}
					*/
					if ($rootScope.lastStateName != undefined) {
						$state.go($rootScope.lastStateName, $rootScope.lastStateParams);
					}
				}, function(reason) {
					console.log("Failed to get an User Data.", reason);
				});
	        },
	        'login': function(username, password) {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/login/',
	                'data':{
	                    'username':username,
	                    'password':password
	                }
	            }).then(function(data) {
	            	$http.defaults.headers.common.Authorization = 'Token ' + data.key;
	                $cookies.token = data.key;

	                // services/auth.js 의 RadioAuth로 부터 넘어오는 data의 포멧은 아래와 같음.
					// data = {'key':some_key_value, 'user':user_primary_key} 
					RadioAuth.getUser(data.user);
	            }, function(reason) {
	            	$rootScope.$broadcast('LoginDenied', reason);
	            });
	        },
	        'logout': function() {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/logout/',
	            });
	        },
	        'signup': function(username, password1, password2) {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/registration/',
	                'data': {
	                    'username':username,
	                    'password1':password1,
	                    'password2':password2,
	                }
	            });
	        }
    	};
    
   		return RadioAuth;
	});