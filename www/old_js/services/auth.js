angular.module('radio.service', [])

	.factory('RadioAuth', function(RootUrl, $http, $cookies, $rootScope, $location) {

		var RadioAuth = {
	        'authenticated': false,
	        'request':function(args) {
	            if($cookies.token){
	                $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
	            }
	            return $http({
	                url : RootUrl + args.url,
	                method : args.method || {},
	                params : args.params || {},
	                data : args.data || {}
	            }).success(function(data, status, headers, config){

	            }).error(function(data, status, headers, config){
	                console.log("data", data);
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
	            }).then(function(response){
	            	RadioAuth.authenticated = true;
	                $http.defaults.headers.common.Authorization = 'Token ' + response.data.key;
	                $cookies.token = response.data.key;
	                RadioAuth.getUser(response.data.user).then(function(rsp) {
	                	RadioAuth.user = rsp.data;
	                	$rootScope.$broadcast('UserLogin', rsp.data);
	                });
	            }, function(reason) {
	            	console.log("Login Deny", reason);
	            	$rootScope.$broadcast('LoginDeny', data);
	            })
	        },
	        'logout': function() {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/logout/',
	            }).then(function(data) {
	                delete $http.defaults.headers.common.Authorization;
	                delete $cookies.token;
	                RadioAuth.authenticated = false;
	                $rootScope.$broadcast('UserLogout');
	            });
	        },
	        'signup': function(username, email, password1, password2) {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/registration/',
	                'data': {
	                    'username':username,
	                    'email':email,
	                    'password1':password1,
	                    'password2':password2,
	                }
	            }).then(function(data) {
	                console.log("success signup!!!");
	            });
	        },
	        'getUser':function(id) {
	        	var RadioAuth = this;
	        	if(RadioAuth.authenticated === true) {
	        		return RadioAuth.request({
	        			'method':'GET',
	        			'url': '/users/' + id ,
	        		}).success(function(response) {
	        			return response.data;
	        		}).error(function(response) {
	        			console.log("error!", response);
	        		})
	        	}
	        },
	        'user':{
	        	/* empty space for user data */
	        }
    	};
    
   		return RadioAuth;
	});