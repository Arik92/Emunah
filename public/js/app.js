var app = angular.module('emunApp', ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html'
    })
    .state('page-about', {
      url: '/about',
      templateUrl: '/templates/page-about.html'
    })
    .state('page-about-rav', {
      url: '/about-rav-dror',
      templateUrl: '/templates/page-about-rav.html'
    })
    .state('page-category', {
      url: '/category',
      templateUrl: '/templates/page-category.html'
    })
    .state('page-contact', {
      url: '/page-contact',
      templateUrl: '/templates/page-contact.html',
    })
    .state('page-error', {
      url: '/error',
      templateUrl: '/templates/page-error.html'
    })
    .state('page-search', {
      url: '/search',
      templateUrl: '/templates/page-search.html'
    })
    .state('post-single', {
      url: '/single',
      templateUrl: '/templates/post-single.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html'
    })
});
