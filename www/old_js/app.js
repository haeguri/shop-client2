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
      cordova.plugins.Keyboard.disableScroll(true);
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

    /* "Radio 하단 탭 */
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'template/tabs/tabs.html',
      controller: 'TabsCtrl'
    })

    /* "메인" 탭 */
    .state('tabs.main', {
      url: '/main',
      views: {
        'tabs-main': {
          templateUrl: 'template/tabs/main/main.html',
          controller: 'MainCtrl'
        }
      }
    })
    
    .state('tabs.main-my-cody', {
      url: '/main/mycody',
      views: {
        'tabs-main':{
          templateUrl: 'template/tabs/main/my/my-cody.html',
          controller: 'MyCodyCtrl'
        }
      }
    })

    .state('tabs.main-my-brand', {
      url: '/main/mybrand',
      views: {
        'tabs-main':{
          templateUrl: 'template/tabs/main/my/my-brand.html',
          controller: 'MyBrandCtrl'
        }
      }
    })

    .state('tabs.main-my-product', {
      url: '/main/myproduct',
      views: {
        'tabs-main':{
          templateUrl: 'template/tabs/main/my/my-product.html',
          controller: 'MyProductCtrl'
        }
      }
    })

    .state('tabs.main-channel-detail', {
      url: '/main/channel/:channel_id',
      views: {
        'tabs-main':{
          templateUrl:'template/tabs/channel/channel-detail.html',
          controller:'ChannelDetailCtrl'
        }
      }
    })

    .state('tabs.main-shop-detail', {
      url: '/main/genders/:gender_id/tags/:tag_id/products/:product_id',
      views: {
        'tabs-main':{
          templateUrl: 'template/tabs/shop/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })

    .state('tabs.main-cody-detail', {
      url: '/main/channel/:channel_id/cody/:cody_id',
      views: {
        'tabs-main':{
          templateUrl:'template/tabs/channel/cody-detail.html',
          controller:'ChannelCodyDetailCtrl'
        }
      }
    })
    
    /* "브랜드" 탭 */
    .state('tabs.brand', {
      url: '/brand',
      views: {
        'tabs-brand':{
          templateUrl: 'template/tabs/brand/intro.html',
          controller: 'BrandIntroCtrl'
        }
      }
    })

    .state('tabs.brand-detail', {
      url: '/brand/:brand_id', 
      views: {
        'tabs-brand': {
          templateUrl: 'template/tabs/brand/brand-detail.html',
          controller: 'BrandDetailCtrl',
        }
      }
    })

    .state('tabs.brand-shop-detail', {
      url: '/brand/genders/:gender_id/tags/:tag_id/products/:product_id',
      views: {
        'tabs-brand': {
          templateUrl: 'template/tabs/shop/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })

    /* "상점" 탭 */
    .state('tabs.shop', {
      url: '/shop/intro',
      views: {
        'tabs-shop':{
          templateUrl: 'template/tabs/shop/intro.html',
          controller: 'ShopIntroCtrl'
        }
      }
    })

    .state('tabs.product-detail', {
      url: '/genders/:gender_id/tags/:tag_id/products/:product_id',
      views:{
        'tabs-shop': {
          templateUrl: 'template/tabs/shop/product-detail.html',
          controller: 'ProductDetailCtrl',
        }
      }
    })

    /* "내 정보" 탭 */
    .state('tabs.private', {
      url: '/private',
      abstract: true,
      views: {
        'tabs-private': {
          templateUrl: 'template/tabs/private/private.html',
        }
      }
    })

    .state('tabs.private.info', {
      url: '/info',
      views: {
        'tabs-private':{
          templateUrl: 'template/tabs/private/info.html',
          controller: 'PrivateInfoCtrl'
        }
      }
    })

    .state('tabs.private.cody', {
      url: '/cody',
      views: {
        'tabs-private':{
          templateUrl: 'template/tabs/private/cody.html',
          controller: 'PrivateCodyCtrl'
        }
      }
    })

    .state('tabs.private.channel', {
      url:'/channel',
      views: {
        'tabs-private':{
          templateUrl: 'template/tabs/private/channel.html',
          controller: 'PrivateChannelCtrl'
        }
      }
    })

    .state('tabs.private.brand', {
      url:'/brand',
      'views': {
        'tabs-private':{
          templateUrl: 'template/tabs/private/brand.html',
          controller: 'PrivateBrandCtrl'
        }
      }
    })

    .state('tabs.private.product', {
      url: '/product',
      views: {
        'tabs-private':{
          templateUrl: 'template/tabs/private/product.html',
          controller: 'PrivateProductCtrl'
        }
      }
    });

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('').icon('fa fa-arrow-left fa-lg').previousTitleText(false);

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);

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