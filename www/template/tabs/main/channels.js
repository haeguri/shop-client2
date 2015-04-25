angular.module('radio.controller')

.controller('ChannelsCtrl', function(Channel, $scope, $location, $state) {

    $scope.main_channels = {};

    var page = 0;

    Channel.getChannels({
    	'params':{
    		'page':++page
    	}
    }).then(function(data) {
    	$scope.main_channels.channels = data.results;
    	console.log("data", data.results);
    })
})