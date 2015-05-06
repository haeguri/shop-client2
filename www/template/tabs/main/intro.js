angular.module('radio.controller')

.controller('MainIntroCtrl', function($scope, $location, $rootScope, 
    $timeout, $state, Product, Channel) {

    $scope.main_intro = {};
    $scope.main_intro.issues = [];
    $scope.main_intro.channels = [];
    $scope.main_intro.products = [];

    var filters = ['추천', '인기'];
    var items = ['issue', 'product', 'channel'];
    var current_item = 0;

    $scope.main_intro.selectedItem = items[0];
    $scope.main_intro.selectedFilter = filters[0];

    $scope.main_intro.changeFilter = function() {
        for(var i = 0; i < filters.length ; i++) {
            if ( $scope.main_intro.selectedFilter != filters[i] ) {
                $scope.main_intro.selectedFilter = filters[i];
                break;
            }
        }
    }

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        $scope.main_intro.routeChangeError = error;
      });

    $scope.main_intro.changeItem = function() {
        if (current_item == items.length-1) {
            current_item = 0;
            console.log("1")
            $scope.main_intro.selectedItem = items[current_item];
        } else {
            console.log("2")
            $scope.main_intro.selectedItem = items[++current_item];
        }
    }


    //console.log("$locatino.absUrl()", $location.absUrl());
    $scope.main_intro.currentUrl = $location.absUrl();

    Channel.getIssues({
        'params':{
            'page':1
        }
    }).then(function(data) {
        console.log("issues!!! on main", data.results);
        $scope.main_intro.issues = data.results;
        Channel.getChannels({
            'params':{
                'page':1
            }
        }).then(function(data) {
           $scope.main_intro.channels = data.results;
           console.log("Channel List!!", data.results);
           Product.getProducts({
                'params': {
                    'page':1
                }
           }).then(function(data){
                $scope.main_intro.products = data.results;
           })
        })
    });

    $scope.main_intro.goChannelDetail = function(channel_id) {
        $location.url('/main/channels/'+channel_id);
        //$location.url('/search/input');
        $scope.main_intro.clickTest = 'channel clicked';
    };

    $scope.main_intro.goIssueDetail = function(issue_id) {
        $scope.main_intro.clickTest = issue_id;
        //$state.go('tabs.main_issue_detail', {'issue_id':issue_id});
        $timeout(function() {
          console.log('DEBUG: $state.go');
          $location.path('/main/issues/'+issue_id);
        },3000);
    };

    $scope.main_intro.goProductDetail = function(product_id) {
        $location.url('/main/products/'+product_id);
        $scope.main_intro.clickTest = 'product clicked';
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
                $log.log("brand follow");
            } else {
                $scope.main_intro.channels[index].follow = false;
                $log.log("brand unfollow");
            }
        });
    }

    $scope.main_intro.goHashTagGlobal = function(tag, $event) {
        $event.stopPropagation();
        $location.url('/main/hashtag/issues?tag='+tag.id);
    }
})