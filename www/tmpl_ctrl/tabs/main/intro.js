angular.module('radio.controller')

.controller('MainIntroCtrl', function($scope, $rootScope, 
    $state, Product, Channel, Follow, $localStorage, $sessionStorage
    ) {

    $scope.main_intro = {};
    $scope.main_intro.issues = [];
    $scope.main_intro.channels = [];
    $scope.main_intro.products = [];

    var menus = [
        {
            'name':'Issue',
            'isInited':false
        },
        {
            'name':'Product',
            'isInited':false
        },
        {
            'name':'Channel',
            'isInited':false
        }
    ];

    var current_index = 0;

    $scope.main_intro.selectedItem = menus[0];

    var getIssues = function(page) {
        Channel.getIssues({
            'params':{
                'page':page
            }
        }).then(function(data) {
            menus[0].isInited = true;
            console.log("issue_list : ", data.results);
            $scope.main_intro.issues = data.results;
        });
    }

    var getProducts = function(page) {
        Product.getProducts({
            'params': {
                'page':page
            }
        }).then(function(data) {
            menus[1].isInited = true;
            console.log("product_list : ", data.results);
            $scope.main_intro.products = data.results;
        })  
    }

    var getChannels = function(page) {
        console.log("channellist!");
        Channel.getChannels({
            'params': {
                'page':page
            }
        }).then(function(data) {
            menus[2].isInited = true;
            console.log("channel_list : ", data.results);
            $scope.main_intro.channels = data.results;
        })
    }

    var initData = function() {
        getIssues(1);
    }

    var loadAllData = function() {
        getIssues(1);
        getChannels(1);
        getProducts(1);
    }

    initData();

    $rootScope.$on('tabs.main_reload', function() {
        console.log("main_reload!");
        loadAllData();
    })

    $scope.main_intro.changeItem = function() {
        if ( menus.length == ++current_index ) {
            current_index = 0;
        }
        $scope.main_intro.selectedItem = menus[current_index];

        if($scope.main_intro.selectedItem.isInited == false) {
            eval('get'+$scope.main_intro.selectedItem.name+'s(1)');
        }
    }

    $scope.main_intro.goIssueDetail = function(issue_id) {
        $state.go('tabs.main_issue_detail', {'issue_id':issue_id});
    };

    $scope.main_intro.goChannelDetail = function(channel_id, $event) {
        $event.stopPropagation();
        $state.go('tabs.main_channel_detail', {'channel_id':channel_id});
    };

    $scope.main_intro.goProductDetail = function(product_id) {
        $state.go('tabs.main_product_detail', {'product_id':product_id});
    };

    $scope.main_intro.goHashTagGlobalIssues = function(tag_id, $event) {
        $event.stopPropagation();
        // 'tag'는 쿼리 스트링. http://localhost/main/hashtag/issues?tag=<태그_ID> 로 요청을 보냄.
        console.log("고 이슈");
        $state.go('tabs.main_tag_global', {'tag':2, 'view':'issues'});
    };

    $scope.main_intro.goHashTagGlobalProducts = function(tag_id, $event) {
        $event.stopPropagation();
        console.log("고 프로덕");
        $state.go('tabs.main_tag_global', {'tag_id':tag_id, 'view':'products'});
    };

    $scope.main_intro.toggleChannelFollow = function(channel, index, event) {
        event.stopPropagation();
        method = channel.follow === false ? 'POST' : 'DELETE';
        Follow.toggleChannelFollow({
                'method':method,
                'channel_id':channel.id
        }).then(function(data) {
            if (channel.follow === false) {
                $scope.main_intro.channels[index].follow= true;
            } else {
                $scope.main_intro.channels[index].follow = false;
            }
            console.log("success!");
        }, function(data) {
            console.log("failed")
        });
    };

})