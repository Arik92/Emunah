app.controller('serviceCtrl', ['$scope', 'lodash', function($scope, lodash) {
  
  this.$onInit = () => {
    console.log('yo from serviceCtrl');
  }

  $scope.thumbnails = [
    { 
      imgSrc: "images/services-prayer.jpg",
      caption: "Prayer",
      uiSref: "services-prayer"
    },
    { 
      imgSrc: "images/services-kaddish.jpg",
      caption: "Kadish",
      uiSref: "services-kaddish"
    },
    { 
      imgSrc: "images/services-tehillim.jpg",
      caption: "Tehillim / Mishnah",
      uiSref: "services-tehillim"
    },
    { 
      imgSrc: "images/services-torah.jpg",
      caption: "Sefer Torah",
      uiSref: "services-learning"
    },
    { 
      imgSrc: "images/yahudi.jpg",
      caption: "Torah Partnership",
      uiSref: "services-torah"
    },
    { 
      imgSrc: "images/services-candle.jpg",
      caption: "Candle",
      uiSref: "services-candle"
    },
    { 
      imgSrc: "images/kotel-note.jpg",
      caption: "Kotel Note",
      uiSref: "services-note"
    }
  ]

}]);//singleCtrl


