angular.module('radio.controller')

	.controller('TagGlobalCtrl', function(Channel, Product, $scope, 
		$ionicHistory, $state, $timeout, $ionicNavBarDelegate, $stateParams) {

        $scope.tag_global = {};

        $scope.tag_global.views = {'이슈':'issues', '상품':'products'};

        $scope.tag_global.currentTag =  $stateParams.tag;
        $scope.tag_global.currentTagName = '';
        $scope.tag_global.currentView = $stateParams.view == 'issues' ? '이슈' : '상품';

 		if ($scope.tag_global.currentView == '이슈') {
 			$timeout(function() {
 				$("ion-view[nav-view='active'] div.two-button-bar a:first-child").siblings("a").addClass('active');
 			})
 		} else {
 			$timeout(function() {
 				$("ion-view[nav-view='active'] div.two-button-bar a:first-child").addClass("active");
 			})
 		}    

 		function setTitle(tag, view) {
 			var title_text = tag + '관련 ' + view;
			$ionicNavBarDelegate.title(title_text);
 		}

        function setCurrentTagName(result_tags) {
            console.log("result_tags", result_tags)
            for(var i in result_tags) {
                if (result_tags[i].id == $scope.tag_global.currentTag) {
                    $scope.tag_global.currentTagName = result_tags[i].name;
                    setTitle($scope.tag_global.currentTagName, $scope.tag_global.currentView);
                    break;
                }
            }
        }

        Channel.getIssues({
	        'params':{
	            'page':1,
	            'tag':$scope.tag_global.currentTag
	        }
	    }).then(function(data) {
	        console.log("issues!!! on main", data.results);
	        $scope.tag_global.issues = data.results;
	        if (data.results.length) {
                setCurrentTagName(data.results[0].hash_tags)
            }
			Product.getProducts({
			    'params': {
			        'page':1,
			        'tag':$scope.tag_global.currentTag
			    }
			}).then(function(data){
			    $scope.tag_global.products = data.results;
			});
	    });

        $scope.tag_global.changeView = function(view) {
        	$scope.tag_global.currentView = view == 'issues' ? '이슈' : '상품';
        	setTitle($scope.tag_global.currentTagName, $scope.tag_global.currentView);
        	$(event.target).addClass('active');
			$(event.target).siblings('a').removeClass('active');
        }

		url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

		$scope.tag_global.goIssueDetail = function(issue_id) {
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_issue_detail', {'issue_id':issue_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_issue_detail', {'issue_id':issue_id});
                    break;
                case 'private':
                    $state.go('tabs.private_issue_detail', {'issue_id':issue_id});
                    break;
                case 'search':
                    $state.go('tabs.search_issue_detail', {'issue_id':issue_id});
                    break;
            }
        }

        $scope.tag_global.goChannelDetail = function(channel_id, $event) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_channel_detail', {'channel_id':channel_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_channel_detail', {'channel_id':channel_id});
                    break;
                case 'private':
                    $state.go('tabs.private_channel_detail', {'channel_id':channel_id});
                    break;
                case 'search':
                    $state.go('tabs.search_channel_detail', {'channel_id':channel_id});
                    break;
            }
        }

         $scope.tag_global.goProductDetail = function(product_id) {
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_product_detail', {'product_id':product_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_product_detail', {'product_id':product_id});
                    break;
                case 'private':
                    $state.go('tabs.private_product_detail', {'product_id':product_id});
                    break;
                case 'search':
                    $state.go('tabs.search_product_detail', {'product_id':product_id});
                    break;
            }
        }

        $scope.tag_global.goTagGlobalIssues = function(tag_id, $event) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_tag_global', {'tag':tag_id, 'view':'issues'});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_tag_global', {'tag':tag_id, 'view':'issues'});
                    break;
                case 'private':
                    $state.go('tabs.private_tag_global', {'tag':tag_id, 'view':'issues'});
                    break;
                case 'search':
                    $state.go('tabs.search_tag_global', {'tag':tag_id, 'view':'issues'});
                    break;
            }
        }

        $scope.tag_global.goTagGlobalProducts = function(tag_id, $event) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_tag_global', {'tag':tag_id, 'view':'products'});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_tag_global', {'tag':tag_id, 'view':'products'});
                    break;
                case 'private':
                    $state.go('tabs.private_tag_global', {'tag':tag_id, 'view':'products'});
                    break;
                case 'search':
                    $state.go('tabs.search_tag_global', {'tag':tag_id, 'view':'products'});
                    break;
            }
        }

})