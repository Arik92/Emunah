app.controller('freeCtrl', ['$scope', '$window', '$timeout', '$rootScope', '$location', function ($scope, $window, $timeout, $rootScope, $location) {
  console.log('hello from createCtrl');
  this.$onInit = () => {
	 $scope.entry = {};  
    initStartDatePicker();
  }  
  //////////////////////////////////// initializing pickers ////////////////////////////////////////////
  //TODO: when loading an event, set the start/end dates accordingly

  function initStartDatePicker() {
	  var initialStart = new Date();
	  $scope.startDate = initialStart.getTime();
	  $scope.startDateDisplay = initialStart.toDateString();
    var startDatepicker = datepicker('#create_start_date_picker', {
      position: 'br', // Top right.
      startDate: new Date(), // This month.
      dateSelected: new Date(), // Today is selected.
      minDate: new Date(1900, 0, 1), // June 1st, 2016.
      maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
      noWeekends: false,
      formatter: function (el, date) {
        // This will display the date as `1/1/2017`.
        el.value = date.toDateString();
      },
      onSelect: function (instance) {
        // Show which date was selected.
        console.log("start date: ", instance.dateSelected);
        $scope.startDate = instance.dateSelected.getTime();
		$scope.startDateDisplay = instance.dateSelected.toDateString();
        //console.log("as string?", $scope.startDate);
		/*var num = instance.dateSelected.getTime();
		console.log("as number: "+num+"and it is a"+typeof(num));
		var date2 = new Date(num);
		console.log("date 2", date2);
		console.log(date2+" re converted "+ date2.toDateString()+"and as time"+date2.getTime());*/
      },
      onShow: function (instance) {
        console.log('Calendar showing.');
      },
      onHide: function (instance) {
        console.log('Calendar hidden.');
      },
      onMonthChange: function (instance) {
        // Show the month of the selected date.
        console.log(instance.currentMonthName);
      },
      customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
      overlayPlaceholder: 'Enter a 4-digit year',
      overlayButton: 'Go!',
      disableMobile: false // Conditionally disabled on mobile devices.
    });
  }

  
  
  ////////////////////file upload /////////////////////////////////////////////////////////////
 
  $scope.compareDates = function () {
    var diff = $scope.endDate - $scope.startDate;
    if (diff > 0) {
      return true;
    } else {
      return false;
    }        //else
  }//compareDates

  
  /////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
  /////////////////////////////////////////// regex validation proofing /////////////////////////////////////////////////////////
  
  /*function checkEmail(email) {
      var patt = /[\w.]+@\w+\.\w+/;//(com|net)
      if (!patt.test(email)) {
        alert("Must have a valid email address")
          return false;
      }//if
        return true;
      // regex pattern: one or more word characters, followed by @, followed by one or more word characters, followed by '.'
      //and by one or more word expressions
  }//checkEmail  
  function checkTextFields(text) {
    var patt = /w+/;
    if (!patt.test) {
      alert("fill enter an event name");
      return false;
    }
    return true;
  }//checkNames
  $scope.validate = function() {
	  checkEmail($scope.entry.email);
  } Appearently, these arent needed because the form validates itself*/
}]);
