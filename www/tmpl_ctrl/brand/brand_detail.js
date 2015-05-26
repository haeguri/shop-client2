angular.module('radio.controller')

	.controller('BrandDetailCtrl', function(Brand, Follow, Product, $scope, 
		$stateParams, $log, $ionicSlideBoxDelegate, $ionicHistory, $rootScope, $state) {

        $scope.brand_detail = {};
 		$scope.brand_detail.submenu = ['FEED', 'ITEM'];
        $scope.brand_detail.selectedMenu = 'FEED';

        var feed_page = 1;
        var product_page = 1;
        var method = '';
        var url_pattern = '';

        var getBrand = function() {
            Brand.getBrand({
                'brand_id':$stateParams.brand_id
            }).then(function(data) {
                $scope.brand_detail.brand = data;
                $ionicSlideBoxDelegate.update();
            });
        }

        var getFeeds = function(page) {
            Brand.getFeeds({
                'params': {
                    'brand':$stateParams.brand_id,
                    'page':feed_page
                }
            }).then(function(data) {
                $scope.brand_detail.feeds = data.results;
            });
        }

        var getProducts = function(page) {
            Product.getProducts({
                'params': {
                    'page':product_page,
                    'brand':$stateParams.brand_id
                }
            }).then(function(data) {
                $scope.brand_detail.products = data.results;
            })
        }

        var initDatas = function() {
            getBrand();
            getFeeds(1);
            getProducts(1);
        }

        initDatas();

        $rootScope.$on('brand_detail_reload', function() {
            console.log("brand_detail_reload!");
            getBrand();
            $ionicHistory.clearCache();
        })

        $scope.brand_detail.toggleBrandFollow = function() {
            method = $scope.brand_detail.brand.follow === false ? 'POST' : 'DELETE';
            Follow.toggleBrandFollow({
                    'method':method,
                    'brand_id':$scope.brand_detail.brand.id
            }).then(function(data) {
                if ($scope.brand_detail.brand.follow === false) {
                    $scope.brand_detail.brand.follow = true;
                    console.log("add follow");
                } else {
                    $scope.brand_detail.brand.follow = false;
                    console.loog("cancel follow");
                }
            });
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
            $state.go('tabs.' + url_pattern + '_product_detail', {'product_id':product_id});
        }

        $scope.brand_detail.goTagSpecificProducts = function($event, brand_id, tag_id) {
            $event.stopPropagation();
            $state.go('tabs.' + url_pattern + '_tag_specific', {'tag':tag_id, 'owner':'brand', 'owner_id':brand_id});
        }

        $scope.brand_detail.goBack = function() {
        	$ionicHistory.goBack();
        }

})