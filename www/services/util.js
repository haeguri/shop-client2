angular.module('radio.util', [])
	.factory('RadioUtil', function(){
		var RadioUtil = {
			'isEmpty': function(obj){
				return Object.keys(obj).length === 0;
			}
		};

		return RadioUtil;
	});