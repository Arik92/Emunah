app.controller('homeCtrl', [ '$rootScope', '$scope', '$state', 'authFactory', 'ytService', 'hebService', '$location', '$anchorScroll', function($rootScope, $scope, $state, authFactory, ytService, hebService, $location, $anchorScroll) {
  //console.log("auth user data to work with", authFactory.currentUser);
  //$rootScope.currentUser = authFactory.currentUser.email;
  $scope.topThree = [];
  ////////****************************LATEST VIDEO INTERFACE ******************************8/////////////////////
  $scope.getLatestVids = function(num) {
  ytService.getLatestVids(num).then(function(data, err){
    if (err) {
      //console.error("controller error fetching latest videos", err);
    } else {
      $scope.footerVids = data.items;
      $scope.topThree = data.items.splice(0,3);
      console.log("top three videos are ", $scope.topThree);
      $scope.latestVids = data.items;

      //console.log("latest vids are", data.items);
    }//else
  })//callback
};//get latest videos
////////****************************LATEST VIDEO INTERFACE ******************************8/////////////////////
//////////////////////////////////////**************** Parasha and hebrew date interface *************************/////////////////////////
function initNavDates() {
	var weekday = new Array(7);
	weekday[0] =  "Sun";
	weekday[1] = "Mon";
	weekday[2] = "Tues";
	weekday[3] = "Wed";
	weekday[4] = "Thurs";
	weekday[5] = "Fri";
	weekday[6] = "Shabbat";
	var month = new Array(12);
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Apr";
	month[4] = "May";
	month[5] = "Jun";
	month[6] = "Jul";
	month[7] = "Aug";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";	
	var d = new Date();
	$scope.currDate = weekday[d.getDay()]+", "+month[d.getMonth()]+ " "+d.getDate()+" , "+d.getFullYear();
	hebService.getCurrentHebDate().then(function(result){
		//console.log("hebdate data: ",result);
		$scope.parasha = result.events[0];
		$scope.CurrentHebDate = result.hd + "-" +result.hm + "-" +result.hy;
		$scope.currDate+= " | "+ result.hd + "-" +result.hm + "-" +result.hy;
		//console.log("currhebdate ", result);
	});
	}
	function getAllHolidays() {
		hebService.getHolidays().then(function(result){
			//console.log("holiday service result", result);			
			$scope.nextHolidayName = result.title;
			var holidayDate = new Date(result.date);			
			holidayDate = holidayDate.toUTCString();
			var patt = /\w+\s\w+\s\w+/; // pattern of recognition - capture first word+space=2second word=space+third word
			$scope.nextHolidayDate = patt.exec(holidayDate)[0];
			//console.log("regdate:", $scope.nextHolidayDate);			
		})//hebcal cb
	}//getholidays
initNavDates();
getAllHolidays();
// friday, nov 10 2017
//////////////////////////////////////**************** Parasha and hebrew date interface *************************/////////////////////////

////////////*************************PLAYLIST INTERFACE **********************************8////////////////////////
  $scope.getAllPlayLists = function() {
    ytService.getAllPlayLists().then(function(data, err){
      if (err) {
        console.error("controller error fetching playlists");
      } else {
        $scope.allPlayLists = playlistFilter(data.items); // an array of 48 playLists
        //console.log("after filter", $scope.allPlayLists);
        $scope.footerPlaylists = $scope.allPlayLists.slice(0,35);
        $scope.playListIndex = 0;
        $scope.numRes = data.pageInfo.totalResults;
        $scope.currentPlaylists = [];
        $scope.updatePlaylistForward();
        $scope.nextToken = data.nextPageToken;
      }//else
    });//callback
  }//getAllPlaylists

  function playlistFilter(playlist) {
    for (var i=0;i<playlist.length;i++) {
      if (playlist[i].snippet.thumbnails.medium.url==="http://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg") {
        playlist.splice(i, 1);
        i--;
      }//if found an irrelevent playlist
    }//for loop

      return playlist;
  }//playListFilter

  $scope.getNextPlayLists = function() {
    ytService.getNextPlayLists($scope.nextToken).then(function(data, err){
      if (err) {
        console.log("controller error fetching next playlists");
      } else {
        for (var i = 0;i<data.items.length;i++) {
            $scope.allPlayLists.push(data.items[i]);
        }//for
        $scope.allPlayLists = playlistFilter($scope.allPlayLists);
        //console.log("array after fetch loop", $scope.allPlayLists);
        $scope.prevToken = data.prevPageToken;
        var count = 0;
      $scope.currentPlaylists = [];
      for (var i = $scope.playListIndex;i<$scope.playListIndex+6;i++) {
        // $scope.currentPlaylists.push($scope.allPlayLists[i]); //NOTE: We might actually want this behaviour
        $scope.currentPlaylists[count] = $scope.allPlayLists[i];
        count++;
      }//for update playlist
      $scope.playListIndex+=6;
      //console.log("playlist index is now", $scope.playListIndex);
      }//else
    })
  }//fetch next playlists

  $scope.getPrevPlayLists = function() {
    ytService.getNextPlayLists($scope.prevToken).then(function(data, err){
      if (err) {
        console.log("controller error fetching next playlists");
      } else {
        $scope.currentPlaylists = data.items;
        $scope.nextToken = data.nextPageToken;
      }//else
    })
  }//fetch prev playlists

  $scope.updatePlaylistForward = function() {
    var max;
    var diff = $scope.allPlayLists.length-$scope.playListIndex;
    if ((diff<=5)&&($scope.playListIndex+diff<$scope.numRes)) {
      $scope.getNextPlayLists();
    } else {
      if (diff<=5) {
        max = diff;  //if we reached here, these are the last 5 or less results
      } else {
        max = 6;
      }
        var count = 0;
        $scope.currentPlaylists = [];
        for (var i = $scope.playListIndex;i<$scope.playListIndex+max;i++) {
          // $scope.currentPlaylists.push($scope.allPlayLists[i]); //NOTE: We might actually want this behaviour
          $scope.currentPlaylists[count] = $scope.allPlayLists[i];
          count++;
        }//for update playlist
        $scope.playListIndex+=max;
        //console.log("playlist index is now", $scope.playListIndex);
      }//else if update shouldnt bring the rest of the results
  }//UPF

  $scope.updatePlaylistBackward = function() {
    var count = 0;
    $scope.currentPlaylists = [];
      $scope.playListIndex-=12;
    for (var i = $scope.playListIndex;i<$scope.playListIndex+6;i++) {
      // $scope.currentPlaylists.push($scope.allPlayLists[i]); //NOTE: We might actually want this behaviour
      $scope.currentPlaylists[count] = $scope.allPlayLists[i];
      count++;
    }//for update playlist
    $scope.playListIndex+=6;
    //console.log("playlist index is now", $scope.playListIndex);
  }//uplb

  $scope.setCurr = function(obj, type) {
    if (type==='playlist') {
    $rootScope.playlistParam = obj;
    } else {
    console.log("gotta complete this");
    }//else type is a playlist
    $state.go('player');
  }//setCurr

  ////////////*************************PLAYLIST INTERFACE **********************************8////////////////////////
  //invokes //
  $scope.getLatestVids(15);
  $scope.getAllPlayLists();
  $scope.state = $state;
  $scope.inState = function(state){
    console.log("checking for state... it is now",  $state.router.globals.current.name)
      return $state.is(state);
  }
  $(document).ready(function(){
    $('.owl-carousel').owlCarousel();
  });
  //console.log("state is ", $state.router.globals.current.name);

  $scope.myInterval = 3000;
  $scope.slides = [
    // {
    //   image: 'images/cali.jpg'
    // },
    {
      image: 'images/c1.jpeg'
    },
    {
      image: 'images/c2.jpeg'
    },
    {
      image: 'images/c3.jpeg'
    }
    // {
    //   image: 'images/c3.jpg'
    // },
    // {
    //   image: 'images/c2-01.jpg'
    // },
    // {
    //   image: 'images/c2-03.jpg'
    // },
    // {
    //   image: 'images/c7.jpg'
    // },
    // {
    //   image: 'images/c1-27.jpg'
    // },
    // {
    //   image: 'images/c9.jpeg'
    // }
    // {
    //   image: 'images/c4.jpg'
    // }
  ];

  $scope.myInterval = 3000;
  $scope.memes = [
    // {
    //   image: 'images/cali.jpg'
    // },
    {
      image: 'images/memes/m1.jpg'
    },
    {
      image: 'images/memes/m2.jpg'
    },
    {
      image: 'images/memes/m3.jpg'
    },
    {
      image: 'images/memes/m4.jpg'
    },
    {
      image: 'images/memes/m5.jpg'
    },
    {
      image: 'images/memes/m6.jpg'
    },
    {
      image: 'images/memes/m7.jpg'
    },
    {
      image: 'images/memes/m8.jpg'
    },
    {
      image: 'images/memes/m9.jpg'
    },
    {
      image: 'images/memes/m10.jpg'
    },
    {
      image: 'images/memes/m11.jpg'
    },
    {
      image: 'images/memes/m12.jpg'
    },
    {
      image: 'images/memes/m13.jpg'
    },
    {
      image: 'images/memes/m14.jpg'
    },
    {
      image: 'images/memes/m15.jpg'
    },
    {
      image: 'images/memes/m16.jpg'
    },
    {
      image: 'images/memes/m17.jpg'
    },
    {
      image: 'images/memes/m18.jpg'
    },
    {
      image: 'images/memes/m19.jpg'
    },
    {
      image: 'images/memes/m20.jpg'
    },
    {
      image: 'images/memes/m21.jpg'
    },
    {
      image: 'images/memes/m22.jpg'
    },
    {
      image: 'images/memes/m23.jpg'
    },
    {
      image: 'images/memes/m24.jpg'
    },
    {
      image: 'images/memes/m25.jpg'
    },
    {
      image: 'images/memes/m25.jpg'
    },
    {
      image: 'images/memes/m26.jpg'
    },
    {
      image: 'images/memes/m27.jpg'
    },
    {
      image: 'images/memes/m28.jpg'
    },
    {
      image: 'images/memes/m29.jpg'
    },
    {
      image: 'images/memes/m30.jpg'
    },
    {
      image: 'images/memes/m31.jpg'
    },
    {
      image: 'images/memes/m32.jpg'
    },
    {
      image: 'images/memes/m33.jpg'
    },
    {
      image: 'images/memes/m34.jpg'
    }
  ];

  var trophies = [
    "img/trophy.png",
    "img/trophy.png",
    "img/trophy.png",
    "img/trophy.png",
    "img/trophy.png"];

  $scope.gotoTop = function($scope, $location, $anchorScroll) {
    // set the location.hash to the id of
    // the element you wish to scroll to.
    $location.hash('to-top');
    // call $anchorScroll()
    $anchorScroll();
  };


}]); //controller

