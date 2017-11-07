var app = angular.module("emunApp", ['ui.router','ui.carousel', 'youtube-embed', 'ngFileUpload']);

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
    .state('category', {
      url: '/category',
      templateUrl: '/templates/category.html'
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
    .state('thanks', {
      url: '/thanks',
      templateUrl: '/templates/thanks.html',
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
      templateUrl: '/templates/mitzvot/mitzvot.html'
    })
    .state('generalMitzvot', {
      url: '/gmitzvot/:article',
      templateUrl: '/templates/mitzvot/generalMitzvah.html',
      controller: 'articleCtrl'
    })
    .state('mitzvot-613', {
      url: '/mitzvot-613',
      templateUrl: '/templates/mitzvot/mitzvot-613.html'
    })
    .state('mitzvot-skullcap', {
      url: '/mitzvot-skullcap',
      templateUrl: '/templates/mitzvot/mitzvot-skullcap.html'
    })
    .state('mitzvot-blessings', {
      url: '/mitzvot-blessings',
      templateUrl: '/templates/mitzvot/mitzvot-blessings.html'
    })
    .state('mitzvot-charity', {
      url: '/mitzvot-charity',
      templateUrl: '/templates/mitzvot/mitzvot-charity.html'
    })
    .state('mitzvot-kosher', {
      url: '/mitzvot-kosher',
      templateUrl: '/templates/mitzvot/mitzvot-kosher.html'
    })
    .state('mitzvot-mezuzah', {
      url: '/mitzvot-mezuzah',
      templateUrl: '/templates/mitzvot/mitzvot-mezuzah.html'
    })
    .state('mitzvot-mikvah', {
      url: '/mitzvot-mikvah',
      templateUrl: '/templates/mitzvot/mitzvot-mikvah.html'
    })
    .state('mitzvot-moon', {
      url: '/mitzvot-moon',
      templateUrl: '/templates/mitzvot/mitzvot-moon.html'
    })
    .state('mitzvot-parents', {
      url: '/mitzvot-parents',
      templateUrl: '/templates/mitzvot/mitzvot-parents.html'
    })
    .state('mitzvot-prayer', {
      url: '/mitzvot-prayer',
      templateUrl: '/templates/mitzvot/mitzvot-prayer.html'
    })
    .state('mitzvot-shabbat', {
      url: '/mitzvot-shabbat',
      templateUrl: '/templates/mitzvot/mitzvot-shabbat.html'
    })
    .state('mitzvot-synagogue', {
      url: '/mitzvot-synagogue',
      templateUrl: '/templates/mitzvot/mitzvot-synagogue.html'
    })
    .state('mitzvot-tefillin', {
      url: '/mitzvot-tefillin',
      templateUrl: '/templates/mitzvot/mitzvot-tefillin.html'
    })
    .state('mitzvot-tzitzit', {
      url: '/mitzvot-tzitzit',
      templateUrl: '/templates/mitzvot/mitzvot-tzitzit.html'
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
      templateUrl: '/templates/store/store.html'
    })
    .state('store-necklaces', {
      url: '/store-necklaces',
      templateUrl: '/templates/store/store-necklaces.html'
    })
    .state('store-shirts', {
      url: '/store-shirts',
      templateUrl: '/templates/store/store-shirts.html'
    })
    .state('store-hebrew', {
      url: '/store-hebrew',
      templateUrl: '/templates/store/store-hebrew.html'
    })
    .state('store-english', {
      url: '/store-english',
      templateUrl: '/templates/store/store-english.html'
    })
    .state('store-booklets', {
      url: '/store-booklets',
      templateUrl: '/templates/store/store-booklets.html'
    })
    .state('store-cds', {
      url: '/store-cds',
      templateUrl: '/templates/store/store-cds.html'
    })
    .state('store-misc', {
      url: '/store-misc',
      templateUrl: '/templates/store/store-misc.html'
    })
    .state('article-single', {
      url: '/article-single',
      templateUrl: '/templates/single-article.html'
    })
    .state('create-article', {
      url: '/create-article',
      templateUrl: '/templates/createArticle.html',
      controller: 'articleCreationCtrl'
    })
     .state('donate', {
      url: '/donate',
      templateUrl: '/templates/donate2.html'
    })
     .state('donate2', {
      url: '/donate2',
      templateUrl: '/templates/donate.html'
    })
     .state('services', {
      url: '/services',
      templateUrl: '/templates/services/services.html'
    })
     .state('services-prayer', {
      url: '/services-prayer',
      templateUrl: '/templates/services/prayer.html'
    })
     .state('services-kaddish', {
      url: '/services-kaddish',
      templateUrl: '/templates/services/kaddish.html'
    })
     .state('services-tehillim', {
      url: '/services-tehillim',
      templateUrl: '/templates/services/tehillim.html'
    })
     .state('services-learning', {
      url: '/services-learning',
      templateUrl: '/templates/services/learning.html'
    })
     .state('services-torah', {
      url: '/services-torah',
      templateUrl: '/templates/services/torah.html'
    })
     .state('services-candle', {
      url: '/services-candle',
      templateUrl: '/templates/services/candle.html'
    })
     .state('services-note', {
      url: '/services-note',
      templateUrl: '/templates/services/note.html'
    })
     .state('soundcloud', {
      url: '/soundcloud',
      templateUrl: '/templates/soundcloud.html'
    })
     .state('centers', {
      url: '/emunah-centers-near-you',
      templateUrl: '/templates/centers/emunah-centers.html'
    })
     .state('echt', {
      url: '/emunah-center-humble-texas',
      templateUrl: '/templates/centers/echumble.html'
    })
     .state('eci', {
      url: '/emunah-center-israel',
      templateUrl: '/templates/centers/ecisrael.html'
    })
     .state('ecny', {
      url: '/emunah-center-new-york',
      templateUrl: '/templates/centers/ecny.html'
    })
     .state('ecbc', {
      url: '/emunah-center-bogota-colombia',
      templateUrl: '/templates/centers/ecbogota.html'
    })
     .state('ecla', {
      url: '/emunah-center-los-angeles',
      templateUrl: '/templates/centers/ecla.html'
    })
    .state('shabbat', {
      url: '/shabbat',
      templateUrl: '/templates/sabbath.html',
      controller: 'sabbathCtrl'
    })
});
