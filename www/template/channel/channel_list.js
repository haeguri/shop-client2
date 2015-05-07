angular.module('radio.controller')

.controller('ChannelListCtrl', function(Channel, Follow, $scope, 
    $location, $state, $log) {

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
        $state.go('tabs.main_channel_detail', {'channel_id':channel_id});
    };

    $scope.channel_list.toggleChannelFollow = function(channel, index, event) {
            event.stopPropagation();
            method = channel.follow === false ? 'POST' : 'DELETE';
            Follow.toggleChannelFollow({
                    'method':method,
                    'channel_id':channel.id
            }).then(function(data) {
                if (channel.follow === false) {
                    $scope.channel_list.channels[index].follow= true;
                    $log.log("brand follow");
                } else {
                    $scope.channel_list.channels[index].follow = false;
                    $log.log("brand unfollow");
                }
            });
        }
})