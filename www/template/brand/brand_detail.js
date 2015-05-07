angular.module('radio.controller')

	.controller('BrandDetailCtrl', function(Channel, Brand, Follow, Product, $scope, 
		$stateParams, $log, $ionicSlideBoxDelegate, $ionicHistory, $location) {

        $scope.brand_detail = {};
 		$scope.brand_detail.submenu = ['FEED', 'ITEM'];
        $scope.brand_detail.selectedMenu = 'FEED';

        var feed_page = 1;
        var product_page = 1;
 		var slideOnceUpdated = false;
        var method = '';
        var url_pattern = '';

        Brand.getBrand({
        	'brand_id':$stateParams.brand_id
        }).then(function(data) {
    		$log.log('data', data);
    		$scope.brand_detail.brand = data;

            Brand.getFeeds({
                'params': {
                    'brand':$stateParams.brand_id,
                    'page':feed_page
                }
            }).then(function(data) {
                $log.log('feeds!!!!', data.results);
                $scope.brand_detail.feeds = data.results;
                Product.getProducts({
                    'params': {
                        'page':product_page,
                        'brand':$stateParams.brand_id
                    }
                }).then(function(data) {
                    $log.log("products!!!!", data.results);
                    $scope.brand_detail.products = data.results;
                })
            })
    	})

        $scope.brand_detail.toggleBrandFollow = function() {
            method = $scope.brand_detail.brand.follow === false ? 'POST' : 'DELETE';
            Follow.toggleBrandFollow({
                    'method':method,
                    'brand_id':$scope.brand_detail.brand.id
            }).then(function(data) {
                if ($scope.brand_detail.brand.follow === false) {
                    $scope.brand_detail.brand.follow = true;
                    //$(event.target).addClass('true').removeClass('false');
                    $log.log("brand follow");
                } else {
                    $scope.brand_detail.brand.follow = false;
                    $log.log("brand unfollow");
                }
            });
        }

        $scope.brand_detail.resizeSlides = function () {
    	/* fix for slides-box bug */
        	if(slideOnceUpdated == false ) {
        		slideOnceUpdated = true;
        		$ionicSlideBoxDelegate.update();
        	}
        }

        $scope.brand_detail.viewInfo = function($event, submenu) {
            if( $scope.brand_detail.selectedMenu != submenu) {
                $scope.brand_detail.selectedMenu = submenu; 
                $(event.target).addClass('active');
                $(event.target).siblings().removeClass('active');
            }
        }

        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        $scope.brand_detail.goProductDetail = function(product_id) {
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

        $scope.brand_detail.goHashTagSpecificProducts = function($event, brand_id, tag_id) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_tag_specific.products', {'tag':tag_id, 'brand':brand_id, 'tag':tag_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_tag_specific.products', {'tag':tag_id, 'brand':brand_id, 'tag':tag_id});
                    break;
                case 'private':
                    $state.go('tabs.private_tag_specific.products', {'tag':tag_id, 'brand':brand_id, 'tag':tag_id});
                    break;
                case 'search':
                    $state.go('tabs.search_tag_specific.products', {'tag':tag_id, 'brand':brand_id, 'tag':tag_id});
                    break;
            }
        }

        $scope.brand_detail.goBack = function() {
        	$ionicHistory.goBack();
        }

})