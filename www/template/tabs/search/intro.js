angular.module('radio.controller')

	.controller('SearchIntroCtrl', function(HashTag, $scope, $location, $state) {

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
            $state.go('tabs.search_input');
        }

        $scope.search_intro.goTagGlobalIssues = function(tag_id) {
        	$state.go('tabs.search_tag_global', {'tag':tag_id, 'view':'issues'});
        }

    })