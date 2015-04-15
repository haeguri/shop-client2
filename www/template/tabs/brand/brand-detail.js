angular.module('radio.controller')

	.controller('BrandDetailCtrl', function(Brand, Shop, $scope, $stateParams, 
		$ionicSlideBoxDelegate, $location, $timeout, $rootScope) {

		$scope.brand_detail = {};

		$scope.brand_detail.products = [];
		$scope.brand_detail.canLoadMore = true;

		$scope.brand_detail.tags = [];
		$scope.brand_detail.selectedTag = {};

		var gender_id = $location.search()['gender'];

		var slideOnceUpdated = false;

        $scope.brand_detail.slideBoxUpdate = function () {
    	/* fix for slides-box bug */
        	$timeout(function() {
        		$ionicSlideBoxDelegate.update();
        	})
        }

        var resetCondition = function(tag_index) {
			$scope.brand_detail.tags[tag_index].products = [];
		}

		Brand.getBrand({
				'gender_id':gender_id,
				'brand_id':$stateParams.brand_id
			}).then(function(data) {
			console.log("data", data)
			$scope.brand_detail.brand = data;
			Shop.getTags({
				'gender_id':$scope.brand_detail.brand.gender,
				'params':{
					'filter':'brand',
					'brand_id':$scope.brand_detail.brand.id
				}
			}).then(function(data) {
				$scope.brand_detail.slideBoxUpdate();
				$rootScope.$broadcast('ngRepeatFinished');
				$scope.brand_detail.tags = data;
				for(var i in $scope.brand_detail.tags) {
					$scope.brand_detail.tags[i].isLoaded = false;
					$scope.brand_detail.tags[i].lastLoadedPage = 0;
					$scope.brand_detail.tags[i].products = [];
				}
				$scope.brand_detail.selectedTag = data[0];
				$scope.brand_detail.getProducts(0);
			})
		})

		$scope.brand_detail.changeTag = function(tag_index) {
			$scope.brand_detail.selectedTag = $scope.brand_detail.tags[tag_index];
			$scope.brand_detail.getProducts(tag_index);
		}

		$scope.brand_detail.getProducts = function(tag_index) {
			if($scope.brand_detail.selectedTag != undefined && $scope.brand_detail.selectedTag.isLoaded === false) {
				$scope.brand_detail.selectedTag.isLoaded = true;
				resetCondition(tag_index);
				Shop.getProducts({
					'params':{
						'page':++$scope.brand_detail.tags[tag_index].lastLoadedPage
					},
					'tag_id':$scope.brand_detail.selectedTag.id,
					'gender_id':gender_id
				}).then(function(data){
					console.log("brand detail product data", data);
					if(data.next == null) {
						$scope.brand_detail.canLoadMore = false;
						loadMore(data, tag_index);
					} else {
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
			$scope.brand_detail.tags[tag_index].products = $scope.brand_detail.tags[tag_index].products.concat(data.results);
			console.log("$scope.brand_detail.tags[tag_index].products", $scope.brand_detail.tags[tag_index].products);
		}

	})
