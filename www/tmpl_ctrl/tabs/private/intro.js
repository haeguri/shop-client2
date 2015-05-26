angular.module('radio.controller')

	.controller('PrivateIntroCtrl', function($state, $scope, $log, 
		$ionicHistory, RadioAuth, $rootScope, $route, $ionicPopup) {

        $scope.private_intro = {};

        if ($rootScope.user != undefined) {
            RadioAuth.getUser($rootScope.user.id).then(function(data) {
                $rootScope.user = {
                    'id': data.id,
                    'name' : data.username,
                    'email' : data.email,
                    'products' : data.product_likes_of_user,
                    'issues': data.issue_likes_of_user,
                    'channels' : data.channel_follows_of_user,
                    'brands' : data.brand_follows_of_user
                };
            });
        } else {
            $rootScope.$broadcast('LoginRequired');
        }
        

        $rootScope.$on('private.follow_reload', function() {})

        $scope.private_intro.goFollow = function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
        	$state.go('tabs.private.follow');
        };

        $scope.private_intro.goLike = function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
        	$state.go('tabs.private.like');
        };

        $scope.private_intro.goCart = function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
            $state.go('tabs.private.cart');
        }

        $scope.private_intro.openLogout = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'LADIO',
                template: '로그아웃 하시겠습니까?',
                cancelText: '취소',
                okText: '로그아웃',
                okType: 'button-dark'
            });

            confirmPopup.then(function(res) {
                RadioAuth.logout().then(function() {
                    delete $http.defaults.headers.common.Authorization;
                    delete $cookies.token;
                    window.location.reload(true);    
                }, function() {
                    console.log("Failed Logout");
                });
            });
        }

    });