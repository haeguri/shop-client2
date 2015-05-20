angular.module('radio.controller')

	.controller('PrivateIntroCtrl', function($state, $scope, $log, 
		$ionicHistory, RadioAuth, $rootScope, $route, $ionicPopup) {

        $scope.private_intro = {};

        RadioAuth.getUser($rootScope.user.id);

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
                if(res) {
                    RadioAuth.logout().then(function() {
                        //$ionicHistory.clearCache();
                        //$state.go('login', {},  {reload: true});
                        //$rootScope.$broadcast('Logout');
                        window.location.reload(true);    
                    });
                } else {
                    console.log('You are not sure');
                }
            });
        }

    });