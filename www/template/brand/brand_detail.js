angular.module('radio.controller')

	.controller('BrandDetailCtrl', function(Channel, Brand, Product, $scope, 
		$stateParams, $log, $ionicSlideBoxDelegate, $ionicHistory, $location) {

        $scope.brand_detail = {};
 		$scope.brand_detail.submenu = ['FEED', 'ITEM'];
        $scope.brand_detail.selectedMenu = 'FEED';

        var feed_page = 1;
        var product_page = 1;
 		var slideOnceUpdated = false;

        Brand.getBrand({
        	'brand_id':$stateParams.brand_id
        }).then(function(data) {
    		$log.log('data', data);
    		$scope.brand_detail.brand = data;

            Brand.getFeeds({
                'brand_id':$stateParams.brand_id,
                'params': {
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

        $scope.brand_detail.goProductDetail = function(product_id) {
            $location.url('/main/products/'+product_id);
        }

        $scope.brand_detail.goHashTagSpecific = function(tag_id, $event) {
            $event.stopPropagation();
            $location.url('/main/specific/hashtag/products?tag='+tag_id+'&brand='+$scope.brand_detail.brand.id);
        }

        $scope.brand_detail.goBack = function() {
        	$ionicHistory.goBack();
        }

})