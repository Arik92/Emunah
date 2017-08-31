var app = angular.module("emunApp", ['ui.router', 'youtube-embed']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'homeCtrl'
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
    .state('playlist', {
      url: '/playlist/:id',
      templateUrl: '/templates/playlist-page.html',
      params: {playlistParam: null},
      controller: 'playlistCtrl'
    })
    .state('page-contact', {
      url: '/page-contact',
      templateUrl: '/templates/page-contact.html',
    })
    .state('whatsapp', {
      url: '/whatsapp',
      templateUrl: '/templates/whatsapp.html',
      controller: 'authCtrl'
    })
    .state('page-thanks', {
      url: '/page-thanks',
      templateUrl: '/templates/page-thanks.html',
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
      url: '/single/:id',
        params: {videoParam: null},
      templateUrl: '/templates/post-single.html',
      controller: 'singleCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup.html',
      controller: 'authCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'authCtrl'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: '/templates/home.html',
      controller: 'authCtrl'
    })
    .state('mitzvot', {
      url: '/mitzvot',
      templateUrl: '/templates/mitzvot.html'
    })
    .state('generalMitzvot', {
      url: '/gmitzvot/:article',
      templateUrl: '/templates/generalMitzvah.html',
      controller: 'articleCtrl'
    })
    .state('mitzvot-613', {
      url: '/mitzvot-613',
      templateUrl: '/templates/mitzvot-613.html'
    })
    .state('mitzvot-skullcap', {
      url: '/mitzvot-skullcap',
      templateUrl: '/templates/mitzvot-skullcap.html'
    })
    .state('mitzvot-blessings', {
      url: '/mitzvot-blessings',
      templateUrl: '/templates/mitzvot-blessings.html'
    })
    .state('mitzvot-charity', {
      url: '/mitzvot-charity',
      templateUrl: '/templates/mitzvot-charity.html'
    })
    .state('mitzvot-kosher', {
      url: '/mitzvot-kosher',
      templateUrl: '/templates/mitzvot-kosher.html'
    })
    .state('mitzvot-mezuzah', {
      url: '/mitzvot-mezuzah',
      templateUrl: '/templates/mitzvot-mezuzah.html'
    })
    .state('mitzvot-mikvah', {
      url: '/mitzvot-mikvah',
      templateUrl: '/templates/mitzvot-mikvah.html'
    })
    .state('mitzvot-moon', {
      url: '/mitzvot-moon',
      templateUrl: '/templates/mitzvot-moon.html'
    })
    .state('mitzvot-parents', {
      url: '/mitzvot-parents',
      templateUrl: '/templates/mitzvot-parents.html'
    })
    .state('mitzvot-prayer', {
      url: '/mitzvot-prayer',
      templateUrl: '/templates/mitzvot-prayer.html'
    })
    .state('mitzvot-shabbat', {
      url: '/mitzvot-shabbat',
      templateUrl: '/templates/mitzvot-shabbat.html'
    })
    .state('mitzvot-synagogue', {
      url: '/mitzvot-synagogue',
      templateUrl: '/templates/mitzvot-synagogue.html'
    })
    .state('mitzvot-tefillin', {
      url: '/mitzvot-tefillin',
      templateUrl: '/templates/mitzvot-tefillin.html'
    })
    .state('mitzvot-tzitzit', {
      url: '/mitzvot-tzitzit',
      templateUrl: '/templates/mitzvot-tzitzit.html'
    })
    .state('ravdror', {
      url: '/ravdror',
      templateUrl: '/templates/ravdror.html'
    })
    .state('articles', {
      url: '/articles',
      templateUrl: '/templates/articles.html'
    })
     .state('store', {
      url: '/store',
      templateUrl: '/templates/store.html'
    })
});
