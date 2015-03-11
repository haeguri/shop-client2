angular.module('radio.service', [])

	.factory('RadioAuth', function(RootUrl, $http, $cookies, $rootScope, $location) {

		var RadioAuth = {
	        'API_URL': RootUrl + '/rest-auth',
	        'authenticated': false,
	        'request':function(args) {
	            if($cookies.token){
	                $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
	            }
	            return $http({
	                url : this.API_URL + args.url,
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
	            var user_data = {};
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/login/',
	                'data':{
	                    'username':username,
	                    'password':password
	                }
	            }).then(function(response){
	            	RadioAuth.authenticated = true;
	                $http.defaults.headers.common.Authorization = 'Token ' + response.data.key;
	                $cookies.token = response.data.key;
	                RadioAuth.user = response.data.user;
	                $rootScope.$broadcast('UserLogin', response.data.user);
	            }, function(reason) {
	            	console.log("Login Deny");
	            	$rootScope.$broadcast('LoginDeny', data);
	            })
	        },
	        'logout': function() {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/logout/',
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
	                'url':'/registration/',
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
	        'get_user':function(id) {
	        	var RadioAuth = this;
	        	if(RadioAuth.authenticated === true) {
	        		return $http({
	        			'method':'GET',
	        			'url': RootUrl + '/user/' + id ,

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