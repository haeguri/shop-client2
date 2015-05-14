angular.module('radio.service', [])

	.factory('RadioAuth', function(RootUrl, $http, $cookies, $location, $rootScope, 
		$log, $location) {

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
	                RadioAuth.getUser(response.data.user).then(function() {
	                	$location.url('/main');
	                });
	            }, function(response) {
	            	$rootScope.$broadcast('LoginDeny', response.data);
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
	        			'url': '/users/' + id
	        		}).then(function(response) {
	        			$rootScope.user = {
			                'id': response.data.id,
			                'name' : response.data.username,
			                'email' : response.data.email,
			                'cart': response.data.cart,
			                'products' : response.data.product_likes_of_user,
			                'issues': response.data.issue_likes_of_user,
			                'channels' : response.data.channel_follows_of_user,
			                'brands' : response.data.brand_follows_of_user
			            };
			            $log.log("User Data", $rootScope.user);
	        		});
        		}
	        },
	        'user':{
	        	/* empty space for user data */
	        }
    	};
    
   		return RadioAuth;
	});