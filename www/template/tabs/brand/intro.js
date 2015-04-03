angular.module('radio.controller')
	
	.controller('BrandIntroCtrl', function($scope, Brand, Shop, $location, Follow, $ionicModal) {
		$scope.brand_intro = {};

		$scope.brand_intro.selectedGender;

		$scope.brand_intro.beCollpased = true;

		Shop.getGenders().then(function(data) {
			$scope.brand_intro.genders = data;
			$scope.brand_intro.selectedGender = data[0];
			getBrands($scope.brand_intro.selectedGender);
		})

		$scope.brand_intro.changeGender = function(gender) {
			$scope.brand_intro.selectedGender = gender;
			getBrands($scope.brand_intro.selectedGender);
		}

		$scope.brand_intro.brandFollow = function(brand, index) {
			if(brand.like == false) {
				console.log("brand false", brand);
				console.log("index", index);
				Follow.brandFollow(brand.id, 'POST').then(function(data){
					$scope.brand_intro.brands[index].like = true;
				});
			} else {
				console.log("brand true", brand);
				Follow.brandFollow(brand.id, 'DELETE').then(function(data){
					$scope.brand_intro.brands[index].like = false;
				})
			}
		}

		$scope.brand_intro.openBrandSort = function() {
        	$ionicModal.fromTemplateUrl('template/tabs/brand/brand-sort.html', {
            scope: $scope
	        }).then(function(modal) {
	            $scope.brand_intro.sort_modal = modal;
	            $scope.brand_intro.sort_modal.show();
	        });
        };

        $scope.brand_intro.closeBrandSort = function() {
            $scope.brand_intro.sort_modal.hide();
            $scope.brand_intro.sort_modal.remove();
        };


		var getBrands = function(gender) {
			$scope.brand_intro.selectedGender = gender
			Brand.getBrands(gender.id).then(function(data) {
				$scope.brand_intro.brands = data;
				console.log("Brands", data);
			})
		}

		$scope.brand_intro.moveBrandDetail = function(brand_id) {
			$location.url('/tabs/brand/'+brand_id+'?gender='+$scope.brand_intro.selectedGender.id);
		}

		$scope.$on('BrandListUpdate', function() {
			Brand.getBrands($scope.brand_intro.selectedGender.id).then(function(data){
				$scope.brand_intro.brands = data;
				console.log("BrandListUpdate", data);
			})
			console.log("BrandListUpdate")
		})

	})