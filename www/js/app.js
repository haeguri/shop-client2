// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('radio', [
  'ionic',
  'tabSlideBox',
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
    
    /* MAIN PAGE */
    .state('tabs.main', {
      url: '/main',
      views: {
        'main': {
          templateUrl: 'template/tabs/main/intro.html',
          controller: 'MainIntroCtrl'
        }
      }
    })
    .state('tabs.main_channel_detail', {
      url: '/main/channels/:channel_id',
      views: {
        'main': {
          templateUrl: 'template/channel/channel_detail.html',
          controller: 'ChannelDetailCtrl'
        }
      }
    })
    .state('tabs.main_issue_detail', {
      url: '/main/issues/:issue_id',
      views: {
        'main':{
          templateUrl: 'template/issue/issue_detail.html',
          controller: 'IssueDetailCtrl'
        }
      }
    })
    .state('tabs.main_product_detail', {
      url: '/main/products/:product_id',
      views: {
        'main': {
          templateUrl: 'template/product/product_detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })
    .state('tabs.main_brand_detail', {
      url: '/main/brands/:brand_id',
      views: {
        'main': {
          templateUrl: 'template/brand/brand_detail.html',
          controller: 'BrandDetailCtrl'
        }
      }
    })
    .state('tabs.main_tag_global', {
      url: '/main/tag?tag&view',
      views: {
        'main': {
          templateUrl: 'template/tabs/tag_global.html',
          controller: 'TagGlobalCtrl'
        }
      }
    })
    .state('tabs.main_tag_specific', {
      url: '/main/tag/specific?tag&owner&owner_id',
      views: {
        'main': {
          templateUrl: 'template/tabs/tag_specific.html',
          controller: 'TagSpecificCtrl'
        }
      }
    })

    /* Channel Tab */
    .state('tabs.channel', {
      url: '/channel',
      views: {
        'channel': {
          templateUrl: 'template/tabs/channel/intro.html',
          controller: 'ChannelIntroCtrl'
        }
      }
    })
    .state('tabs.channel_tag_global', {
      url: '/channel/tag?tag&view',
      views: {
        'channel': {
          templateUrl: 'template/tabs/tag_global.html',
          controller: 'TagGlobalCtrl'
        }
      }
    })
    .state('tabs.channel_tag_specific', {
      url: '/channel/tag/specific/tag?tag&owner&owner_id',
      views: {
        'channel': {
          templateUrl: 'template/tabs/tag_specific.html',
          controller: 'TagSpecificCtrl'
        }
      }
    })
    .state('tabs.channel_channel_detail', {
      url: '/channel/channels/:channel_id',
      views: {
        'channel': {
          templateUrl: 'template/channel/channel_detail.html',
          controller: 'ChannelDetailCtrl'
        }
      }
    })
    .state('tabs.channel_issue_detail', {
      url: '/channel/issues/:issue_id',
      views: {
        'channel': {
          templateUrl: 'template/issue/issue_detail.html',
          controller: 'IssueDetailCtrl'
        }
      }
    })
    .state('tabs.channel_product_detail', {
      url: '/channel/products/:product_id',
      views: {
        'channel': {
          templateUrl: 'template/product/product_detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })
    .state('tabs.channel_brand_detail', {
      url: '/channel/brands/:brand_id',
      views: {
        'channel': {
          templateUrl: 'template/brand/brand_detail.html',
          controller: 'BrandDetailCtrl'
        }
      }
    })

    /* "마이 페이지" */
    .state('tabs.private', {
      url: '/private',
      views: {
        'private': {
          templateUrl: 'template/tabs/private/intro.html',
          controller: 'PrivateIntroCtrl'
        }
      }
    })
    .state('tabs.private.follow', {
      url: '/follow',
      views: {
        'private': {
          templateUrl: 'template/tabs/private/follow.html',
          controller: 'PrivateFollowCtrl'
        }
      }
    })
    .state('tabs.private.like', {
      url: '/like',
      views: {
        'private': {
          templateUrl: 'template/tabs/private/like.html',
          controller: 'PrivateLikeCtrl'
        }
      }
    })
    .state('tabs.private.cart', {
      url: '/cart',
      views: {
        'private': {
          templateUrl: 'template/tabs/private/cart.html',
          controller: 'PrivateCartCtrl'
        }
      }
    })
    .state('tabs.private_tag_global', {
      url: '/private/tag?tag&view',
      views: {
        'private': {
          templateUrl: 'template/tabs/tag_global.html',
          controller: 'TagGlobalCtrl'
        }
      }
    })
    .state('tabs.private_tag_specific', {
      url: '/private/tag/specific/tag?tag&owner&owner_id',
      views: {
        'private': {
          templateUrl: 'template/tabs/tag_specific.html',
          controller: 'TagSpecificCtrl'
        }
      }
    })
    .state('tabs.private_channel_detail', {
      url: '/private/channels/:channel_id',
      views: {
        'private': {
          templateUrl: 'template/channel/channel_detail.html',
          controller: 'ChannelDetailCtrl'
        }
      }
    })
    .state('tabs.private_issue_detail', {
      url: '/private/issues/:issue_id',
      views: {
        'private': {
          templateUrl: 'template/issue/issue_detail.html',
          controller: 'IssueDetailCtrl'
        }
      }
    })
    .state('tabs.private_product_detail', {
      url: '/private/products/:product_id',
      views: {
        'private': {
          templateUrl: 'template/product/product_detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })
    .state('tabs.private_brand_detail', {
      url: '/private/brands/:brand_id',
      views: {
        'private': {
          templateUrl: 'template/brand/brand_detail.html',
          controller: 'BrandDetailCtrl'
        }
      }
    })

    /* SEARCH PAGE */
    .state('tabs.search', {
      url: '/search',
      views: {
        'search': {
          templateUrl: 'template/tabs/search/intro.html',
          controller: 'SearchIntroCtrl'
        }        
      }
    })
    .state('tabs.search_input', {
      url: '/search/input',
      views: {
        'search': {
          templateUrl: 'template/tabs/search/input.html',
          controller: 'SearchInputCtrl'
        }        
      }
    })
    .state('tabs.search_tag_global', {
      url: '/search/tag?tag&view',
      views: {
        'search': {
          templateUrl: 'template/tabs/tag_global.html',
          controller: 'TagGlobalCtrl'
        }
      }
    })
    .state('tabs.search_tag_specific', {
      url: '/search/specific/tag?tag&owner&owner_id',
      views: {
        'search': {
          templateUrl: 'template/tabs/tag_specific.html',
          controller: 'TagSpecificCtrl'
        }
      }
    })
    .state('tabs.search_channel_detail', {
      url: '/search/channels/:channel_id',
      views: {
        'search': {
          templateUrl: 'template/channel/channel_detail.html',
          controller: 'ChannelDetailCtrl'
        }
      }
    })
    .state('tabs.search_issue_detail', {
      url: '/search/issues/:issue_id',
      views: {
        'search': {
          templateUrl: 'template/issue/issue_detail.html',
          controller: 'IssueDetailCtrl'
        }
      }
    })
    .state('tabs.search_product_detail', {
      url: '/search/products/:product_id',
      views: {
        'search': {
          templateUrl: 'template/product/product_detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })
    .state('tabs.search_brand_detail', {
      url: '/search/brands/:brand_id',
      views: {
        'search': {
          templateUrl: 'template/brand/brand_detail.html',
          controller: 'BrandDetailCtrl'
        }
      }
    })
    

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('').icon('fa fa-chevron-left').previousTitleText(false);

  $ionicConfigProvider.views.maxCache(0);
  
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
