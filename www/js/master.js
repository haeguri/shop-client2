angular.module('radio.controller', [])

	.controller('MasterCtrl', function($scope, $rootScope, Cart, $ionicPopup,
		$route, $timeout, $location, $ionicScrollDelegate, RadioAuth, 
		$rootScope, $location, $ionicModal, $ionicSlideBoxDelegate, $state) {

		$scope.$on('UserLogin', function(event, data){
			$rootScope.user = {
				'id': data.id,
				'name' : data.username,
				'email' : data.email,
				'cart': data.cart,
				'products' : data.product_likes_of_user,
				'issues': data.issue_likes_of_user,
				'channels' : data.channel_follows_of_user,
				'brands' : data.brand_follows_of_user
			};
			console.log("rootScope User Data", $rootScope.user);
			$location.url('/rec/issues');
		});

		$scope.$on('UserLogout', function(event) {
			$route.reload();
		});

		$scope.$on('LoginDeny', function(event, data) {
			$scope.showAlert();
			$rootScope.$broadcast('loading:hide');
		});

	    $rootScope.$on('loading:show', function() {
	      $ionicLoading.show({template: '<img src="css/ajax-loader.gif"></img>'});
	    });

	    $rootScope.$on('loading:hide', function() {
	      $ionicLoading.hide();
	    });

	    /*
	    $scope.cody_detail.openShopDetail = function(product) {

	      var main_tabs_pattern = /\/tabs\/shop\/intro/.exec($location.absUrl());

	      if(main_tabs_pattern != null) {
	        $location.url('/tabs/main/genders/'+product.tag.gender+'/tags/'+product.tag.id+'/products/'+product.id);
	      }
	      if(channel_tabs_pattern != null) {
	        $location.url('/tabs/channel/genders/'+product.tag.gender+'/tags/'+product.tag.id+'/products/'+product.id);
	      }
	    }
	    */
/*
	    $rootScope.$on('$stateChangeSuccess', function() {
	    	var shop_intro_pattern = /\/tabs\/shop\/intro/.exec($location.absUrl());
	    	console.log("$location.absUrl()", $location.absUrl());

	      	if(shop_intro_pattern != null) {
	      		$ionicSlideBoxDelegate.update();
	      		console.log("Update! pattern != null");
	      	}
	    });
*/
	    /*
	    $scope.$on('$ionicView.beforeEnter', function() {
			$ionicSlideBoxDelegate.update();
			console.log("beforeEnter");
		});
		*/


	});