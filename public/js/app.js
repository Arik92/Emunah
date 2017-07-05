var app = angular.module('emunApp', ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: '/templates/contact.html',
      controller: 'mailController'
    })
});
