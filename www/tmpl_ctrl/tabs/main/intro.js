angular.module('radio.controller')

.controller('MainIntroCtrl', function($scope, $location, $rootScope, 
    $timeout, $state, Product, Channel, Follow, $ionicNavBarDelegate
    , $stateParams) {

    $scope.main_intro = {};
    $scope.main_intro.issues = [];
    $scope.main_intro.channels = [];
    $scope.main_intro.products = [];

    var filters = ['추천', '인기'];
    var items = ['issue', 'product', 'channel'];
    var current_item = 0;

    $scope.main_intro.selectedItem = items[0];
    $scope.main_intro.selectedFilter = filters[0];

    var getIssues = function(page) {
        Channel.getIssues({
            'params':{
                'page':page
            }
        }).then(function(data) {
            console.log("issues!!! on main", data.results);
            $scope.main_intro.issues = data.results;
        });
    }

    var getChannels = function(page) {
        Channel.getChannels({
            'params': {
                'page':page
            }
        }).then(function(data) {
            $scope.main_intro.channels = data.results;
            console.log("Channel List!!", data.results);
        })
    }

    var getProducts = function(page) {
        Product.getProducts({
            'params': {
                'page':page
            }
        }).then(function(data) {
            $scope.main_intro.products = data.results;
            console.log("Products List!!", data.results);
        })  
    }

    var initDatas = function() {
        getIssues(1);
        getChannels(1);
        getProducts(1);
    }

    initDatas();

    $rootScope.$on('tabs.main_reload', function() {
        console.log("main_reload!");
        initDatas();
    })

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

    $scope.main_intro.changeFilter = function() {
        for(var i = 0; i < filters.length ; i++) {
            if ( $scope.main_intro.selectedFilter != filters[i] ) {
                $scope.main_intro.selectedFilter = filters[i];
                break;
            }
        }
    }

    $scope.main_intro.changeItem = function() {
        if (current_item == items.length-1)  {
            current_item = 0;
            $scope.main_intro.selectedItem = items[current_item];
        } else {
            $scope.main_intro.selectedItem = items[++current_item];
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

})