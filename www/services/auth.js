angular.module('radio.service', [])

	.factory('RadioAuth', function(RootUrl, $http, $q, $cookies, $location, $rootScope, 
		$log, $location) {

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
	        'login': function(username, password) {
	            var RadioAuth = this;
	            return RadioAuth.request({
	                'method':'POST',
	                'url':'/rest-auth/login/',
	                'data':{
	                    'username':username,
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
	        },
	        'getUser':function(id) {
	        	var RadioAuth = this;
	        	return RadioAuth.request({
	        			'method':'GET',
	        			'url': '/users/' + id
        		});
	        }
    	};
    
   		return RadioAuth;
	});