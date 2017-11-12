app.service('hebService', function($http) {
  //this service is responsible for everything regarding the hebrew calender

  function exp1() {
    return $http.get('https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=3448439&m=50&s=on').then(function(result){
      console.log("Exp return is", result.data);
    })
  }//exp
  function getCurrentHebDate() {
    var currDate = new Date();
    var month = currDate.getMonth();
    month++;
    console.log("month", month);
    var day = currDate.getDate();
    console.log("day", day);
    var year = currDate.getFullYear();
    console.log("year", year);
    return $http.get("https://www.hebcal.com/converter/?cfg=json&gy="+year+"&gm="+month+"&gd="+day+"&g2h=1").then(function(result){
      console.log("Exp2 return is", result.data);
      return result.data;
    })
  }//exp
  function getSabbath(lat, lng, tz, minutes) {
    //navigator.geolocation.getCurrentPosition
    return $http.get('https://www.hebcal.com/shabbat/?cfg=json&b=18&a=on&m='+minutes+'&geo=pos&latitude='+lat+'&longitude='+lng+'&tzid='+tz).then(function(result){
    console.log("Exp return is", result.data);
    return result.data;
    })
  }//getSabbath
  function getLocationTz(str)  {
    return $http.get(str).then(function(result){
      console.log("tz request result is", result.data);
      return result.data;
    })//result cb
  }//getLocationTz

  return {
    exp1: exp1,
    getCurrentHebDate: getCurrentHebDate,
    getSabbath: getSabbath,
    getLocationTz: getLocationTz
  };
});