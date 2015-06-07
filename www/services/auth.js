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
        		});
	        },
	        'login': function(email, password) {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/login/',
	                'data':{
	                    'email':email,
	                    'password':password
	                }
	            });
	        },
	        'logout': function() {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/logout/',
	            });
	        },
	        'signup': function(email, nickname, password1, password2) {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/registration/',
	                'data': {
	                	'email':email,
	                    'nickname':nickname,
	                    'password1':password1,
	                    'password2':password2,
	                }
	            });
	        },
	        'passwordChange': function(password1, password2) {
	        	var RadioAuth = this;
	        	return RadioAuth.request({
	        		'method':'POST',
	        		'url':'/rest-auth/password/change/',
	        		'data': {
	        			'new_password1':password1,
	        			'new_password2':password2
	        		}
	        	});
	        },
	        'passwordReset': function(email) {
	        	var RadioAuth = this;
	        	return RadioAuth.request({
	        		'method':'POST',
	        		'url':'/rest-auth/password/reset/',
	        		'data': {
	        			'email':email
	        		}
	        	});
	        }
    	};
    
   		return RadioAuth;
	});