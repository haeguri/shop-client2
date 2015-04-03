angular.module('radio.controller', [])

	.controller('MasterCtrl', function($scope, Cart, $ionicPopup,
		$route, $timeout, $location, $ionicScrollDelegate, RadioAuth, 
		$rootScope, $location, $ionicModal, $ionicSlideBoxDelegate) {

		$scope.$on('UserLogin', function(event, data){
			$scope.user = {
				'id': data.id,
				'name' : data.username,
				'email' : data.email,
				'cart': data.cart,
				'like_products' : data.product_likes_of_user,
				'like_codies': data.cody_likes_of_user,
				'follow_channels' : data.channel_follows_of_user,
				'follow_brands' : data.brand_follows_of_user
			};
			console.log("User Data", $scope.user);
			$location.url('/tabs/main');
		});

		$scope.$on('UserLogout', function(event) {
			$route.reload();
		});

		$scope.$on('LoginDeny', function(event, data) {
			$scope.showAlert();
			$rootScope.$broadcast('loading:hide');
		});

		$scope.showAlert = function() {
			var alertPopup = $ionicPopup.alert({
			 title: '로그인 오류',
			 template: '<p align="center">아이디 혹은 비밀번호가 다릅니다.<p>',
			 okType: '<button class="button button-dark">확인</button>'
			});
			alertPopup.then(function(res) {
			
			});
		};

        $scope.openSearch = function() {
        	$ionicModal.fromTemplateUrl('template/tabs/search.html', {
            scope: $scope
	        }).then(function(modal) {
	            $scope.search = modal;
	            $scope.search.show();
	        });
        };

        $scope.closeSearch = function() {
            $scope.search.hide();
            $scope.search.remove();
        };

        $scope.openNotify = function() {
	        $ionicModal.fromTemplateUrl('template/tabs/notify.html', {
        		scope: $scope
        	}).then(function(modal) {
        		$scope.notify = modal;
        		$scope.notify.show();
        	})
    	 	$ionicSlideBoxDelegate.update();
        }

        $scope.closeNotify = function() {
        	$scope.notify.hide();
        	$scope.notify.remove();
        }



        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
        // Execute action
        });

        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
        // Execute action
        });


	});