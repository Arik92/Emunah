var app = angular.module("emunApp", ['ui.router', 'ui.carousel', 'youtube-embed', 'ngFileUpload', 'ngLodash']);

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authServiceInterceptors');
})
app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('formspree-verify.txt', {
      url: 'formspree-verify.txt',
      templateUrl: 'formspree-verify.txt'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'homeCtrl'
    })
    .state('page-about', {
      url: '/about-emunah',
      templateUrl: '/templates/about/page-about.html'
    })
    .state('page-about-rav', {
      url: '/about-rav-dror',
      templateUrl: '/templates/about/page-about-rav.html'
    })
    .state('category', {
      url: '/category',
      templateUrl: '/templates/category.html'
    })
    .state('playlist', {
      url: '/playlist/:title/:id',
      templateUrl: '/templates/playlist-page.html',      
      controller: 'playlistCtrl'
    })
    .state('page-contact', {
      url: '/contact',
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
    .state('hitbodedut', {
      url: '/hitbodedut',
      templateUrl: '/templates/hitbodedut.html',
    })
    .state('usa', {
      url: '/lectures-in-usa',
      templateUrl: '/templates/usa.html',
    })
    .state('ravusa', {
      url: '/rav-dror-in-usa',
      templateUrl: '/templates/rav-dror-in-usa.html',
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
      params: { videoParam: null },
      templateUrl: '/templates/post-single.html',
      controller: 'singleCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup.html',
      controller: 'authCtrl',
	  authenticated: false
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
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
	 .state('free1', {
      url: '/free-trip-to-israel1',
      templateUrl: '/templates/freeisrael.html',
      controller: 'freeCtrl'
    })
    .state('store', {
      url: '/store',
      templateUrl: '/templates/store/store.html'
    })
    .state('store-necklaces', {
      url: '/store-necklaces',
      templateUrl: '/templates/store/store-necklaces.html',
      controller: 'storeCtrl'
    })
    .state('store-illustrations', {
      url: '/store-illustrations',
      templateUrl: '/templates/store/store-illustrations.html',
      controller: 'storeCtrl'
    })
    .state('store-paintings', {
      url: '/store-paintings',
      templateUrl: '/templates/store/store-paintings.html',
      controller: 'storeCtrl'
    })
    .state('store-judaica', {
      url: '/store-judaica',
      templateUrl: '/templates/store/store-judaica.html',
      controller: 'storeCtrl'
    })
    .state('store-mp3s', {
      url: '/store-mp3s',
      templateUrl: '/templates/store/store-mp3s.html',
      controller: 'storeCtrl'
    })
    .state('store-pdf', {
      url: '/store-pdf',
      templateUrl: '/templates/store/store-pdf.html',
      controller: 'storeCtrl'
    })
    .state('store-shirts', {
      url: '/store-shirts',
      templateUrl: '/templates/store/store-shirts.html',
      controller: 'storeCtrl'
    })
    .state('store-hebrew', {
      url: '/store-hebrew',
      templateUrl: '/templates/store/store-hebrew.html',
      controller: 'storeCtrl'
    })
    .state('store-english', {
      url: '/store-english',
      templateUrl: '/templates/store/store-english.html',
      controller: 'storeCtrl'
    })
    .state('store-booklets', {
      url: '/store-booklets',
      templateUrl: '/templates/store/store-booklets.html',
      controller: 'storeCtrl'
    })
    .state('store-cds', {
      url: '/store-cds',
      templateUrl: '/templates/store/store-cds.html',
      controller: 'storeCtrl'
    })
    .state('store-misc', {
      url: '/store-misc',
      templateUrl: '/templates/store/store-misc.html',
      controller: 'storeCtrl'
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
      templateUrl: '/templates/donate.html'
    })
    .state('services', {
      url: '/services',
      templateUrl: '/templates/services/services.html',
      controller: 'serviceCtrl'
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
      templateUrl: '/templates/Sabbath.html',
      controller: 'sabbathCtrl'
    })
    .state('faq', {
      url: '/faq',
      templateUrl: '/templates/about/faq.html',
    })
    .state('about', {
      url: '/about',
      templateUrl: '/templates/about/about.html',
    })
    .state('free', {
      url: '/free-trip-to-israel',
      templateUrl: '/templates/temp/freeisrael.html',
    })
    .state('visitisrael', {
      url: '/visit-israel-rav-dror',
      templateUrl: '/templates/temp/israeltrip.html',
    })
    .state('chayei-sarah', {
      url: '/becoming-closer-to-hashem-good-eyes-a-pure-heart',
      templateUrl: '/templates/articles/chayei-sarah.html'
    })	  
	.state('auth', {
      url: '/authorization?token&name',
      controller: function($stateParams, $state, $rootScope, $http) {
        console.log("state params are", $stateParams);
        if ($stateParams.token) {
          var user = {
            name: $stateParams.name,
            token: $stateParams.token
          }
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.currentUser = user.name;
          //$rootScope.$broadcast('fbLogin');
          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
          $state.go('home');
        }
      }//controller
    })
	.state('full', {
      url: '/full-lectures',
      templateUrl: '/templates/full.html',
      controller: 'longPlCtrl'
    })
	.state('short', {
      url: '/short-lectures',
      templateUrl: '/templates/short.html',
      controller: 'shortPlCtrl'
    })
});

app.run(function ($rootScope, authFactory, $state, $anchorScroll, $location) {
  var user = JSON.parse(localStorage.getItem("user"));
  console.log("app.run user", user);
  if (user) {
    $rootScope.currentUser = user.name;
    $state.go('home');
    //$rootScope.$broadcast('fbLogin');
  }//if s
/*  $rootScope.$on('$stateChangeStart', function () {
	  //$location.hash('layout2');
    $anchorScroll();
});
$rootScope.$on('$stateChangeSuccess', function () {
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;}); */
	$rootScope.$on('$locationChangeStart', function() {
   document.body.scrollTop = document.documentElement.scrollTop = 0;
});
});//app.run


