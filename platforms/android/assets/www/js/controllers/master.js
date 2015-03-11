angular.module('radio.controller', [])

	.controller('MasterCtrl', function($scope, Cart, $ionicPopup,
		$route, $timeout, $location, $ionicScrollDelegate, RadioAuth) {

		$scope.master = { 'scrolling':false };
		
		$scope.$on('UserLogin', function(event, data){
			$scope.user = {
				'id': data.id,
				'name' : data.username,
				'email' : data.email,
				'like_products' : data.likes_of_user,
				'follow_channels' : data.channel_follows_of_user
			};
			console.log("User Data", $scope.user);
			Cart.cartInit($scope.user.id);
		});

		$scope.$on('CartInit', function(event, data) {
			$scope.user.cart = data;
		});

		$scope.$on('UserLogout', function(event) {
			$scope.user = null;
			$route.reload();
		});

		$scope.$on('UserDataRefresh', function(event){
			/*
			RadioAuth.get_user($scope.user.id).then(function(response){
            	$scope.user = {
					'id':response.data.id,
					'name': response.data.username,
					'email': response.data.email,
					'like_products':response.data.likes_of_user,
					'follow_channels' : response.data.channel_follows_of_user
				};
			})
			*/		
			console.log("fadsfasdf")
			//Cart.cartInit($scope.user.id);
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

		$scope.goBack = function() {
			$('#radio-tabs').removeClass('tabs-item-hide');
		};

		$scope.master.scroll = function() {
			$timeout(function() {
				$scope.master.scrolling = true;
				$('#radio-tabs').addClass('tabs-item-hide');
			}, 0);
			console.log("scroll");
		};

		$scope.master.scrollb = function() {
			$timeout(function () {
			   $scope.master.scrolling = false;
			   if($location.path() == '/tabs/shop' || $location.path() == '/tabs/channel')
			   	$('#radio-tabs').removeClass('tabs-item-hide');
			   $ionicScrollDelegate.resize();
			}, 200);
			console.log("end scroll");
		};



	});