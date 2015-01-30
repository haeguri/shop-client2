// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('radio', [
  'ionic',
  'radio.service',
  'radio.controller'
  ])

.run(function($ionicPlatform) {
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
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.hide();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SingupCtrl'
    })
    
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'templates/tabs/tabs.html'
    })

    .state('tabs.tab1', {
      url: '/tab1',
      views: {
        'tabs-tab1': {
          templateUrl: 'templates/tabs/tab1.html',
          controller: 'Tab1Ctrl'
        }
      }
    })

    .state('tabs.tab2', {
      url: '/tab2',
      views: {
        'tabs-tab2': {
          templateUrl: 'templates/tabs/tab2.html',
          controller: 'Tab2Ctrl'
        }
      }
    })

    .state('tabs.tab3', {
      url: '/tab3',
      views: {
        'tabs-tab3': {
          templateUrl: 'templates/tabs/tab3.html',
          controller: 'Tab3Ctrl'
        }
      }
    })

    .state('tabs.tab4', {
      url: '/tab4',
      views: {
        'tabs-tab4': {
          templateUrl: 'templates/tabs/tab4.html',
          controller: 'Tab4Ctrl'
        }
      }
    })

    .state('tabs.tab5', {
      url: '/tab5',
      views: {
        'tabs-tab5': {
          templateUrl: 'templates/tabs/tab5.html',
          controller: 'Tab5Ctrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/login');

  $ionicConfigProvider.tabs.position('bottom');
  

});
