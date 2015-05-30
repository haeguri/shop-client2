angular.module('radio.controller')

	.controller('PrivateIntroCtrl', function($state, $scope, $log, $cookies,
		$ionicHistory, RadioAuth, $rootScope, $route, $ionicPopup, $http, $timeout, $ionicScrollDelegate) {

        $scope.private_intro = {};

        $scope.private_intro.check_auth = function() {
            if ($rootScope.user != undefined) {
                console.log("refresh UserData!");
                RadioAuth.getUser($rootScope.user.id).then(function(data) {
                    RadioAuth.setUserData(data);
                });

            } else {
                $rootScope.$broadcast('LoginRequired');
            }
        }

        $scope.private_intro.headerMenus = {
            'follow': {
                'url':'tmpl_ctrl/tabs/private/follow.html',
                'sub_menus':['채널', '이슈', '상품']
            },
            'info': {
                'url':'tmpl_ctrl/tabs/private/info.html'
            }
        }

        $scope.private_intro.currentHeaderMenu = $scope.private_intro.headerMenus.follow;
        $scope.private_intro.currentSubheaderMenu = 'channel';

        $scope.private_intro.goFollow = function() {
            if ($scope.private_intro.currentHeaderMenu != $scope.private_intro.headerMenus.follow) {
                $scope.private_intro.currentHeaderMenu = $scope.private_intro.headerMenus.follow;
                $('a.fa.fa-plus-square.follow').addClass('actived');
                $('a.fa.fa-info-circle.info').removeClass('actived');

            }
        };

        $scope.private_intro.goInfo = function() {
            if ($scope.private_intro.currentHeaderMenu != $scope.private_intro.headerMenus.info) {
                $scope.private_intro.currentHeaderMenu = $scope.private_intro.headerMenus.info;
                //$('a.fa.fa-plus-square.follow').addClass('actived');
                $('a.fa.fa-info-circle.info').addClass('actived');
                $('a.fa.fa-plus-square.follow').removeClass('actived');
            };
        };

        $scope.private_intro.toggleView = function(new_view) {
            $(event.target).addClass('actived');
            $(event.target).siblings('a').removeClass('actived');
            $scope.private_intro.currentSubheaderMenu = new_view;
            $ionicScrollDelegate.resize();
        }

        $scope.private_intro.goChannelDetail = function(channel_id) {
            $state.go('tabs.private_channel_detail', {'channel_id':channel_id});
        }

        $scope.private_intro.goIssueDetail = function(issue_id) {
            $state.go('tabs.private_issue_detail', {'issue_id':issue_id});
        }

        $scope.private_intro.goProductDetail = function(product_id) {
            $state.go('tabs.private_product_detail', {'product_id':product_id}); 
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
                        delete $rootScope.storage.NICKNAME;
                        delete $rootScope.storage.PASSWORD;

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