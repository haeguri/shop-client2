angular.module('radio.controller')

	.controller('PrivateInfoCtrl', function($scope, Product, $log, $rootScope, 
		$state, $ionicPopup, $http, $cookies, RadioAuth, $timeout, $localStorage) {

        $scope.private_info = {};
       	
        $scope.private_info.openLogout = function() {
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
                        // delete $rootScope.storage.NICKNAME;
                        // delete $rootScope.storage.PASSWORD;

                        delete $http.defaults.headers.common.Authorization;
                        delete $cookies.token;
                        $timeout(function() {
                            window.location.reload(true);
                        },500)
                    }, function() {
                        console.log("Failed Logout");
                    });
                } else {
                    // 로그아웃 취소
                }
            });
        }

	});