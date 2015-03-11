angular.module('radio.controller')
	.controller('ShopListCtrl', function(Shop, MediaUrl, Like, RadioAuth, $scope, $timeout, 
		$location, $ionicScrollDelegate, $route, $stateParams) {

		$scope.shop_list = {};

		$scope.shop_list.products = [];
		$scope.shop_list.canLoadMore = true;
		var page_count = 0;

		$scope.shop_list.mediaUrl = MediaUrl;

		$scope.shop_list.isCollapsed = true;

		var setData = function(category) {
			$scope.shop_list.selectedCategory = category;
			$scope.shop_list.tags = category.tags_of_category;
			$scope.shop_list.selectedTag = category.tags_of_category[0];
		}

		var resetCondition = function() {
			$scope.shop_list.products = [];
			$scope.shop_list.canLoadMore = true;
			page_count = 0;
		}

		/* category tag product init */
		Shop.queryCategory($stateParams.gender_id).then(function(data){
			$scope.shop_list.categories = data;
			setData(data[0]);
			$scope.shop_list.queryProduct();
		});

		Shop.queryTag($stateParams.gender_id).then(function(data){
			
			console.log("tags", data);
		})

		$scope.shop_list.changeCategory = function(category) {
			setData(category);
			$scope.shop_list.queryProduct();
		}

		$scope.shop_list.changeTag = function(tag) {
			$scope.shop_list.selectedTag = tag;
			$scope.shop_list.queryProduct();
		}

		$scope.shop_list.queryProduct = function() {
			if($scope.shop_list.selectedTag != undefined) {
				resetCondition();
				Shop.queryProduct({
					'params':{
						'page':++page_count,
						'tag_id':$scope.shop_list.selectedTag.id
					}
				}).then(function(data){
					if(data.next == null) {
						loadMore(data);
						$scope.shop_list.canLoadMore = false;
					} else {
						$ionicScrollDelegate.resize();
						loadMore(data);
					}
				}, function(data) {
					console.log("data", data);
				});
			}
		}

		var loadMore = function(data) {
			for (var i in data.results) {
				var element = data.results[i].likes_of_product;
				for (var j in element) {
					if (element[j].user == $scope.user.id) {
						data.results[i]['like'] = true;
						break;
					} else {
						data.results[i]['like'] = false;
					}
				}
			}
			$scope.shop_list.products = $scope.shop_list.products.concat(data.results);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}

		$scope.shop_list.openDetailProduct = function(product_id) {
			$location.url('/tabs/shop/'+$stateParams.gender_id+'/product/'+product_id);
		};

		$scope.shop_list.toggleLike = function(product_id) {
			Like.toggle($scope.user.id, product_id).then(function(data) {
				if(data.status === true) {
					$('#product-heart-'+product_id).css("color", "#e60000");
					$('#product-count-'+product_id).html(data.likes);
				}else {
					$('#product-heart-'+product_id).css("color", "#444444");
					$('#product-count-'+product_id).html(data.likes);
				}
			});
		};

	});

