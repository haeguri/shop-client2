angular.module('radio.controller')

	.controller('ChannelIntroCtrl', function(Channel, $scope, $location,
		$ionicSlideBoxDelegate, $timeout, $log) {

        $scope.channel_intro = {};

        $scope.channel_intro.pub_days = [];
        $scope.channel_intro.pub_days.push({
        	'day' : 'new',
        	'channels': [],
        	'last_page' : 0,
        	'is_loaded':false
        })

        var slideUpdate = function() {
        	$timeout(function() {
				$ionicSlideBoxDelegate.update();
			})
        }

        Channel.getPubDays().then(function(data){
            slideUpdate();
            for (var i in data) {
                data[i]['channels'] = [];
                data[i]['last_page'] = 0;
                data[i]['isLoaded'] = false;
                $scope.channel_intro.pub_days.push(data[i])
            }
            getChannels(0);
        });

        $scope.channel_intro.urlTest = $location.absUrl();

        var getChannels = function(day_index) {
        	if($scope.channel_intro.pub_days[day_index]['is_loaded'] != true) {
        		$log.log("Start channel load");
        		Channel.getChannels({
	        		'params': {
	        			'page': ++$scope.channel_intro.pub_days[day_index]['last_page'],
	        			'day': $scope.channel_intro.pub_days[day_index]['day']
		        	}
		        }).then(function(data){
	        		$scope.channel_intro.pub_days[day_index]['channels'] = data.results
	        		$scope.channel_intro.pub_days[day_index]['is_loaded'] = true;
	        	})
        	}
        	
        }

        $scope.channel_intro.changeDay = function(day_index) {
        	console.log("change day !", day_index);
        	getChannels(day_index);
        } 

        $scope.channel_intro.goChannelDetail = function(channel_id) {
        	$location.url('/channel/channels/'+channel_id);
        }

	});