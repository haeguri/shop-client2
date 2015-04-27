angular.module('radio.controller')

.controller('ChannelListCtrl', function(Channel, $scope, $location, $state) {

    $scope.channel_list = {};

    var page = 0;

    Channel.getChannels({
    	'params':{
    		'page':++page
    	}
    }).then(function(data) {
    	$scope.channel_list.channels = data.results;
    	console.log("data", data.results);
    });

    $scope.channel_list.goChannelDetail = function(channel_id) {
        $location.url('/main/channels/'+channel_id);
    };
})