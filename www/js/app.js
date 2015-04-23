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

    /* Radio 하단 탭 */
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'template/tabs/tabs.html',
      controller: 'TabsCtrl'
    })

    /* "메인" 탭 */
    .state('tabs.main', {
      url: '/main',
      /*
      abstract: true,
      templateUrl: 'template/tabs/main/intro.html',
      controller: 'MainIntroCtrl'
      */
      views: {
        'tabs-main': {
          templateUrl: 'template/tabs/main/intro.html',
          controller: 'MainIntroCtrl'
        }
      }
    
    })

    .state('tabs.main.intro_issue', {
      url: '/issues',
      views: {
        'tabs-main': {
          templateUrl: 'template/tabs/main/intro_issue.html',
          controller: 'MainIntroIssueCtrl'
        }
      }
    })

    .state('tabs.main.intro_product', {
      url: '/products',
      views: {
        'tabs-main': {
          templateUrl: 'template/tabs/main/intro_product.html',
          controller: 'MainIntroProductCtrl'
        }
      }
    })

    .state('tabs.main-hashtag', {
      url: '/main/channel/:channel_id/hashtag/:tag_id',
      views: {
        'tabs-main': {
          templateUrl: 'template/hashtag/hashtag.html',
          controller: 'HashTagCtrl'
        }
      }
    })

    .state('tabs.main-hashtag-global', {
      url: '/main/hashtag/:tag_id',
      views: {
        'tabs-main': {
          templateUrl: 'template/hashtag/hashtag_global.html',
          controller: 'HashTagCtrl'
        }
      }
    })

    .state('tabs.main-issue_detail', {
      url: '/main/issues/:issue_id',
      views: {
        'tabs-main':{
          templateUrl: 'template/issue/issue_detail.html',
          controller: 'IssueDetailCtrl'
        }
      }
    })

    /* "채널" 탭 */
    .state('tabs.channel', {
      url: '/channel',
      views: {
        'tabs-channel': {
          templateUrl: 'template/tabs/channel/intro.html',
          controller: 'ChannelIntroCtrl'
        }
      }
    })

    /* "마이 페이지" */
    .state('tabs.private', {
      url: '/private',
      views: {
        'tabs-private': {
          templateUrl: 'template/tabs/private/following.html',
          controller: 'PrivateFollowingCtrl'
        }
      }
    })

    /* "검색" */
    .state('tabs.search', {
      url: '/search',
      views: {
        'tabs-search': {
          templateUrl: 'template/tabs/search/intro.html',
          controller: 'SearchIntroCtrl'
        }        
      }
    })
    

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('').icon('fa fa-arrow-left fa-lg').previousTitleText(false);

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
.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background': 'url(' + url +') no-repeat center center fixed'
        })
    }
})
