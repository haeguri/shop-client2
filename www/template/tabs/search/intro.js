angular.module('radio.controller')

	.controller('SearchIntroCtrl', function(HashTag, $scope, $location) {

        $scope.search_intro = {};

        $scope.search_intro.selectedMenu = '이슈'

        HashTag.getHashTags({
        	'params': {
        		'filter':'rec'
        	}
        }).then(function(data) {
        	$scope.search_intro.hash_tags = data;
        })

     	$scope.search_intro.viewMenu = function(menu_name) {
        	if( $scope.search_intro.selectedMenu != menu_name) {
				$scope.search_intro.selectedMenu = menu_name;	
				$(event.target).addClass('active');
				$(event.target).siblings().removeClass('active');
			}
        }

        $scope.search_intro.goSearchInput = function() {
            console.log("clicked")
            $location.url('/search/input');
        }

        $scope.search_intro.goHashTagGlobal = function(tag) {
        	$location.url('/search/hashtag/issues?tag='+tag.id);
        }


})