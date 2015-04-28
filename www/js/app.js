// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('radio', [
  'ionic',
  'tabSlideBox',
  'ngResource',
  'ngCookies',
  'ngRoute',
  'radio.directive',
  'ui.bootstrap',
  'radio.service',
  'radio.controller'
  ])

.run(function($ionicPlatform, RadioAuth, $location, $http, $cookies, 
    $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at 
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    //console.log("$cordovaStatusbar", $cordovaStatusbar);
    //console.log("$cordovaStatusbar.hide()", $cordovaStatusbar.hide())

    if (RadioAuth.authenticated === false) {
      $location.url('/login');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, 
  $httpProvider, $compileProvider) {

  $stateProvider
    
    .state('login', {
      url: '/login',
      templateUrl: 'template/login.html',
      controller: 'LoginCtrl'
    })
    
    .state('signup', {
      url: '/signup',
      templateUrl: 'template/signup.html',
      controller: 'SignupCtrl'
    })

    /* Radio 하단 탭 */
    .state('tabs', {
      abstract: true,
      templateUrl: 'template/tabs/tabs.html',
      controller: 'TabsCtrl'
    })

    /* "메인" 탭 */


    .state('tabs.main', {
      views: {
        'main': {
          templateUrl: 'template/tabs/main/intro.html',
          controller: 'MainIntroCtrl'
        }
      }
    })

    .state('tabs.main.rec_issues' ,{
      url: '/rec/issues',
      views: {
        'main': {
          templateUrl: 'template/issue/issue_list.html',
          controller: 'IssueListCtrl'
        }
      }
    })

    .state('tabs.main.rec_channels' ,{
      url: '/rec/channels',
      views: {
        'main': {
          templateUrl: 'template/channel/channel_list.html',
          controller: 'ChannelListCtrl'
        }
      }
    })

    .state('tabs.main.hot_issues', {
      url: '/hot/issues',
      views: {
        'main': {
          templateUrl: 'template/issue/issue_list.html',
          controller: 'IssueListCtrl'
        }
      }
    })

    .state('tabs.main.hot_products', {
      url: '/hot/products', 
      views: {
        'main': {
          templateUrl: 'template/product/product_list.html',
          controller: 'ProductListCtrl'
        }
      }
    })

    .state('tabs.main_channel', {
      url: '/main/channels/:channel_id',
      views: {
        'main': {
          templateUrl: 'template/channel/channel_detail.html',
          controller: 'ChannelDetailCtrl'
        }
      }
    })

    .state('tabs.main_product', {
      url: '/main/products/:product_id',
      views: {
        'main': {
          templateUrl: 'template/product/product_detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })

    .state('tabs.main_brand', {
      url: '/main/brands/:brand_id',
      views: {
        'main': {
          templateUrl: 'template/brand/brand_detail.html',
          controller: 'BrandDetailCtrl'
        }
      }
    })


    .state('tabs.main_tag_global', {
      url: '/main/hashtag',
      views: {
        'main': {
          templateUrl: 'template/hashtag/global.html',
          controller: 'HashTagGlobalCtrl'
        }
      }
    })

    .state('tabs.main_tag_global.issues', {
      url: '/issues?tag',
      views: {
        'main': {
          templateUrl: 'template/issue/issue_list.html',
          controller: 'IssueListCtrl'
        }
      }
    })

    .state('tabs.main_tag_global.products', {
      url: '/products?tag',
      views: {
        'main': {
          templateUrl: 'template/product/product_list.html',
          controller: 'ProductListCtrl'
        }
      }
    })

    .state('tabs.main_tag_specific', {
      url: '/main/specific/hashtag',
      views: {
        'main': {
          templateUrl: 'template/hashtag/specific.html',
          controller: 'HashTagSpecificCtrl'
        }
      }
    })

    .state('tabs.main_tag_specific.issues', {
      url: '/issues?tag&channel',
      views: {
        'main': {
          templateUrl: 'template/issue/issue_list.html',
          controller: 'IssueListCtrl'
        }
      }
    })

    .state('tabs.main_tag_specific.products', {
      url: '/products?tag&brand',
      views: {
        'main': {
          templateUrl: 'template/product/product_list.html',
          controller: 'ProductListCtrl'
        }
      }
    })


    /*
    .state('tabs.main.intro_issue', {
      url: '/issues',
      views: {
        'main': {
          templateUrl: 'template/tabs/main/intro_issue.html',
          controller: 'MainIntroIssueCtrl'
        }
      }
    })

    .state('tabs.main.intro_product', {
      url: '/products',
      views: {
        'main': {
          templateUrl: 'template/tabs/main/intro_product.html',
          controller: 'MainIntroProductCtrl'
        }
      }
    })

    */
/*
    .state('tabs.main_hashtag_global_issues', {
      url: '/main/hashtag/:tag_id/issues',
      views: {
        'main': {
          templateUrl: 'template/hashtag_global/issue_list.html',
          controller: 'HashTagIssueListCtrl'
        }
      }
    })


    .state('tabs.main_hashtag_issues', {
      url: '/main/channel/:channel_id/hashtag/:tag_id/issues',
      views: {
        'main': {
          templateUrl: 'template/hashtag/issue_list.html',
          controller: 'HashTagIssueListCtrl'
        }
      }
    })


    .state('tabs.main_hashtag_products', {
      url: '/main/hashtag/:tag_id/products',
      views: {
        'main': {
          templateUrl: 'template/hashtag/product_list.html',
          controller: 'HashTagProductListCtrl'
        }
      }
    })

*/
    /*
    .state('tabs.main_hashtag_global_proudcts', {
      url: '/main/hashtag/:tag_id/products'
    })
    */

    .state('tabs.main_issue', {
      url: '/main/issues/:issue_id',
      views: {
        'main':{
          templateUrl: 'template/issue/issue_detail.html',
          controller: 'IssueDetailCtrl'
        }
      }
    })

    /* "채널" 탭 */
    .state('tabs.channel', {
      url: '/channel',
      views: {
        'channel': {
          templateUrl: 'template/tabs/channel/intro.html',
          controller: 'ChannelIntroCtrl'
        }
      }
    })

    /* "마이 페이지" */
    .state('tabs.private', {
      url: '/private',
      views: {
        'private': {
          templateUrl: 'template/tabs/private/following.html',
          controller: 'PrivateFollowingCtrl'
        }
      }
    })

    /* "검색" */
    .state('tabs.search', {
      url: '/search',
      views: {
        'search': {
          templateUrl: 'template/tabs/search/intro.html',
          controller: 'SearchIntroCtrl'
        }        
      }
    })
    

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('').icon('fa fa-chevron-left').previousTitleText(false);

  //$ionicConfigProvider.views.maxCache(0);
  
  /*
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      }
    }
  })
  */

})
