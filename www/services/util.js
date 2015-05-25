angular.module('radio.util', [])
	.factory('RadioUtil', function(){
		var RadioUtil = {
			'isEmpty': function(obj){
				console.log("obj in isEmpty", obj);
				return Object.keys(obj).length === 0;
			}
		};

		return RadioUtil;
	});