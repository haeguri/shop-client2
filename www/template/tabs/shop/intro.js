angular.module('radio.controller')
	
	.controller('ShopIntroCtrl', function(Shop, Like, RadioAuth, $scope, $timeout, $q,
		$location, $ionicScrollDelegate, $route, $stateParams, $ionicModal, $ionicSlideBoxDelegate) {

		$scope.shop_intro = {};

		$scope.shop_intro.beCollpased = true;

		$scope.shop_intro.products = [];
		$scope.shop_intro.canLoadMore = true;

		$scope.shop_intro.genders;
		$scope.shop_intro.selectedGender;
		$scope.shop_intro.tags;
		$scope.shop_intro.selectedTag;

		var deferred = $q.defer();

		var slideOnceUpdated = false;

		var slideBoxUpdate = function() {
			if(slideOnceUpdated == false ) {
        		slideOnceUpdated = true;
        		$ionicSlideBoxDelegate.update();
        	}
		}

		var resetCondition = function(tag_index) {
			$scope.shop_intro.tags[tag_index].products = [];
		}

		var selectGenderTag = function(gender, tag_index) {
			$scope.shop_intro.selectedGender = gender;
			$scope.shop_intro.tags = gender.tags_of_gender;
			for(var i in $scope.shop_intro.tags) {
				$scope.shop_intro.tags[i].isLoaded = false;
				$scope.shop_intro.tags[i].lastLoadedPage = 0;
				$scope.shop_intro.tags[i].products = [];
			}
			$scope.shop_intro.selectedTag = gender.tags_of_gender[0];
			$scope.shop_intro.getProducts(tag_index);
			$scope.$broadcast('ngRepeatFinished');
		}

		Shop.getGenders().then(function(data) {
			$scope.shop_intro.genders = data;
			selectGenderTag(data[0], 0);
		})

		$scope.shop_intro.changeGender = function(gender) {
			if (gender.id != $scope.shop_intro.selectedGender.id) {
				selectGenderTag(gender, 0);
				//$timeout(function() {
				$scope.shop_intro.beCollpased = true;
				slideOnceUpdated = false;
				//}, 300)
			}
		}		

		$scope.shop_intro.changeTag = function(tag_index) {
			$scope.shop_intro.selectedTag = $scope.shop_intro.tags[tag_index];
			$scope.shop_intro.getProducts(tag_index);
		}

		$scope.shop_intro.getProducts = function(tag_index) {
			if($scope.shop_intro.selectedTag != undefined && $scope.shop_intro.selectedTag.isLoaded === false) {
				$scope.shop_intro.selectedTag.isLoaded = true;
				resetCondition(tag_index);
				Shop.getProducts({
					'params':{
						'page':++$scope.shop_intro.tags[tag_index].lastLoadedPage
					},
					'tag_id':$scope.shop_intro.selectedTag.id,
					'gender_id':$scope.shop_intro.selectedGender.id
				}).then(function(data){
					console.log("shop product data", data);
					slideBoxUpdate();
					if(data.next == null) {
						$scope.shop_intro.canLoadMore = false;
						loadMore(data, tag_index);
						$scope.$broadcast('scroll.infiniteScrollComplete');
					} else {
						$ionicScrollDelegate.resize();
						loadMore(data);
					}
				});
			}
		}
			
		var loadMore = function(data, tag_index) {
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
			$scope.shop_intro.tags[tag_index].products = $scope.shop_intro.tags[tag_index].products.concat(data.results);
		}

		$scope.shop_intro.toggleLike = function(product_id) {
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

		$scope.shop_intro.openProductDetail = function(product_id) {
			console.log("product_id", product_id);
			$location.url('/tabs/genders/'+$scope.shop_intro.selectedGender.id+ '/tags/' + $scope.shop_intro.selectedTag.id + '/products/'+product_id);
		}


        $scope.shop_intro.openProductSort = function() {
        	$ionicModal.fromTemplateUrl('template/tabs/shop/product-sort.html', {
            scope: $scope
	        }).then(function(modal) {
	            $scope.shop_intro.sort_modal = modal;
	            $scope.shop_intro.sort_modal.show();
	        });
        };

        $scope.shop_intro.closeProductSort = function() {
            $scope.shop_intro.sort_modal.hide();
            $scope.shop_intro.sort_modal.remove();
        };

	})