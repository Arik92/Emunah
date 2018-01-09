app.service('hebService', ['$http', function($http) {
  //this service is responsible for everything regarding the hebrew calender

  function findNextHoliday(date, holidays) {
	  //function receives a date in miliseconds and array of holidays with date strings
	  //returns the first indice of a date with higer miliseconds than date. otherwise return -1
	  //console.log(" holidays ", holidays);
	  //console.log("date "+date+" holidays "+holidays);
	  for (var i=0;i<holidays.length;i++) {
		  //console.log("returned date before conversion"+holidays[i].date);
		  var dateToCompare = new Date(holidays[i].date);
		  //console.log("holiday date as a date:",dateToCompare+"and as time"+ dateToCompare.getTime())
		  //console.log("comparing "+dateToCompare.getTime()+" and "+date);
		  if (dateToCompare.getTime()>=date) {
			  return i;
		  }//if 
	  }//for 
	  return -1;
  }//findNextHoliday
  
  function getHolidays() {
	  var d = new Date();
	  var currentDateTime = d.getTime();
	  var currentMonth = d.getMonth()+1;
	  var currentYear = d.getFullYear();
	  //console.log("current date for ",currentMonth);
	  //TODO: if its the last month of the year, get next year's holidays of the first month. year = currentYear+1, month = 0; 
    return $http.get('https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year='+currentYear+'&month='+currentMonth+'&mf=on&ss=on&c=off&s=off').then(function(result){
      //console.log("Holiday general result is", result.data);
	  var nextHolidayIndex = findNextHoliday(currentDateTime, result.data.items);
	  if (nextHolidayIndex===-1) {		  
		  if (currentMonth===12) {
			  currentYear++;
			  return $http.get('https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year='+currentYear+'&month=0&mf=on&ss=on&c=off&s=off').then(function(yearResult){
			  //console.log("year result ", yearResult);
			  nextHolidayIndex = findNextHoliday(currentDateTime, yearResult.data.items);
			  //console.log("the next holiday's index is" , nextHolidayIndex);
			  console.log("went into next year's holidays. returning "+yearResult.data.items[nextHolidayIndex]);
			  return yearResult.data.items[nextHolidayIndex];			  
			  });
		  } else {
			  currentMonth++;
			  return $http.get('https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year='+currentYear+'&month='+currentMonth+'&mf=on&ss=on&c=off&s=off').then(function(monthResult){
			  nextHolidayIndex = findNextHoliday(currentDateTime, monthResult.data.items);	
			  console.log("went into next month's holidays. returning "+monthResult.data.items[nextHolidayIndex]);
			  return monthResult.data.items[nextHolidayIndex];
			  });
		  }//else 
	  }//if couldnt find next holiday for this month	  
	  return result.data.items[nextHolidayIndex];
    })
  }//getHolidays
  // loop over returned items, and return the first item with more miliseconds than the curent time
	  // if it found them, we are done. Otherwise:
	  // if the current month is not december, fetch next months holidays and repeat this process
	  // otherwise, return next years january holidays and repeat this process
  function getCurrentHebDate() {
    var currDate = new Date();
    var month = currDate.getMonth();
    month++;
    //console.log("month", month);
    var day = currDate.getDate();
    //console.log("day", day);
    var year = currDate.getFullYear();
    //console.log("year", year);
    return $http.get("https://www.hebcal.com/converter/?cfg=json&gy="+year+"&gm="+month+"&gd="+day+"&g2h=1").then(function(result){
      //console.log("Exp2 return is", result.data);
      return result.data;
    })
  }//exp
  function getSabbath(lat, lng, tz, minutes) {
    //navigator.geolocation.getCurrentPosition
    return $http.get('https://www.hebcal.com/shabbat/?cfg=json&b=18&a=on&m='+minutes+'&geo=pos&latitude='+lat+'&longitude='+lng+'&tzid='+tz).then(function(result){
    //console.log("Exp return is", result.data);
    return result.data;
    })
  }//getSabbath
  function getLocationTz(str)  {
    return $http.get(str).then(function(result){
      //console.log("tz request result is", result.data);
      return result.data;
    })//result cb
  }//getLocationTz

  return {
    getHolidays: getHolidays,
    getCurrentHebDate: getCurrentHebDate,
    getSabbath: getSabbath,
    getLocationTz: getLocationTz
  };
}]);