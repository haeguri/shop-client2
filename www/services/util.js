angular.module('radio.util', [])
	.factory('RadioUtil', function(){
		var RadioUtil = {
			'isEmpty': function(obj){
				return Object.keys(obj).length === 0;
			},
			'log' : function(msg, data) {
				if (window.cordova) {
					console.log(msg, JSON.stringify(data));
				} else {
					console.log(msg, data);
				}
			}

		};

		return RadioUtil;
	});