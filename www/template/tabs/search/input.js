angular.module('radio.controller')

	.controller('SearchInputCtrl', function(HashTag, Search, $scope, $timeout, $location) {

        $scope.search_input = {};
        $scope.search_input.input = '';

        var converted_code = '',
            timeoutToRequest = {},
            splited_str = [];

        $scope.search_input.received_query = [];

        HashTag.getHashTags({
        	'params': {
        		'filter':'rec'
        	}
        }).then(function(data) {
        	$scope.search_input.hash_tags = data;
        })

        $scope.search_input.requestQuery = function() {
            var params = '';
            $timeout.cancel(timeoutToRequest);
            timeoutToRequest = $timeout(function() {
                console.log("params", params);
                if ($scope.search_input.input != '') {
                    Search.getQuery({
                        'params':{
                            'keyword':$scope.search_input.input
                        }
                    }).then(function(data) {
                        $scope.search_input.received_query = data;
                        console.log("data", data);
                    })
                }   
            }, 1000)
        }

     	$scope.search_input.viewMenu = function(menu_name) {
        	if( $scope.search_intro.selectedMenu != menu_name) {
				$scope.search_intro.selectedMenu = menu_name;	
				$(event.target).addClass('active');
				$(event.target).siblings().removeClass('active');
			}
        }

        $scope.search_input.goHashTagGlobal = function(item_id) {
        	$location.url('/search/hashtag/issues?tag='+item_id);
        }

        $scope.search_input.clickTest = function() {
            console.log("Clicked");
        }


})