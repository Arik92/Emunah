app.controller('articleCreationCtrl',['articleFactory','$scope' ,'Upload','$window','$timeout','$rootScope','$location', function(articleFactory, $scope, Upload, $window, $timeout, $rootScope, $location){
  $scope.tempTags = [];

  $scope.addTag = function() {
    $scope.tempTags.push($scope.tagInput);
  }//addTag

  $scope.deleteTag = function(index) {
    $scope.tempTags.splice(index, 1);
  }

  ////////////////////////////////////////quill//////////////////////////////////////////
  var quill = new Quill('#editor', {
    modules: { toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'blockquote'],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }, { 'direction': 'ltr' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'align': [] }]
    ]
   },
    theme: 'snow',
    placeholder: 'start typing...'
  });
  $scope.save = function(){
    var value = JSON.stringify(quill.getContents());
    console.log("value is ", value);
  }
  ////////////////////////////////////////quill//////////////////////////////////////////

  //////////////////////////////////// initializing pickers ////////////////////////////////////////////
  var startDatepicker = datepicker('#custom_date', {
  position: 'br', // Top right.
  startDate: new Date(), // This month.
  dateSelected: new Date(), // Today is selected.
  minDate: new Date(), // June 1st, 2016.
  maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
  noWeekends: false,
  formatter: function(el, date) {
    // This will display the date as `1/1/2017`.
    el.value = date.toDateString();
  },
  onSelect: function(instance) {
    // Show which date was selected.
    console.log("start date: ", instance.dateSelected);
    $scope.startDate = instance.dateSelected;
    console.log("as string?", $scope.startDate.toDateString());
  },
  onShow: function(instance) {
    console.log('Calendar showing.');
  },
  onHide: function(instance) {
    console.log('Calendar hidden.');
  },
  onMonthChange: function(instance) {
    // Show the month of the selected date.
    console.log(instance.currentMonthName);
  },
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  overlayPlaceholder: 'Enter a 4-digit year',
  overlayButton: 'Go!',
  disableMobile: true // Conditionally disabled on mobile devices.
});
        $scope.upload = function () {
          var submitPic = document.getElementById('fileItem').files[0];
          console.log("in submit! uploading...", submitPic);
          var evt = {
            title: $scope.eName,
            publisher: $rootScope.userDetails.username,
            type: $scope.selectedType,
            location: {
                locationMapUrl: $scope.selectedPlace.url,
                  latlng: {
                  lat: $scope.selectedLat,
                  lng: $scope.selectedLng
                 },
                locationName: $scope.selectedPlace.formatted_address
              },
            image: $scope.imageName,
            startTime: $scope.startDate.toDateString(),
            startHr: $scope.startHr,
            endTime: $scope.endDate.toDateString(),
            endHr: $scope.endHr,
            description: $scope.eDesc,
            numTickets: $scope.totalTickets, //tickets remaining
            isPrivate: $scope.isPrivate,
            showRemainingTicks: $scope.showRemain
          };// event post object
          evt.tickets = [];
          for (var i=0;i<$scope.tempTicks.length;i++) {
            evt.tickets.push($scope.tempTicks[i]);
          }// for filling ticket array
          if (submitPic) {
            Upload.upload({
                url: 'http://localhost:8000/events/upload', //webAPI exposed to upload the file
                data: {
                  file:submitPic,
                   event: evt
                 } //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                console.log("controller response is", resp);
                if(resp.data.error_code === 0){ //validate success
                  console.log("response file object", resp.config.data.file);
                  console.log("added event successfully!");
                  $scope.showRedirect = true;
                  $timeout(function() {
                    $location.path('/');
                  }, 2000);
                    //$window.alert('Success'  + resp.config.data.file.name + ' uploaded');
                    $scope.imageName = resp.data.file_name;
                    console.log("image name will be?", $scope.imageName);
                  //  publishEvent(); // call a function to submit the whole event
                } else {
                    $window.alert(resp.data.error_code);
                }
            }, function (error) { //catch error
                console.log('Error status: ' + error);
          });
        } else {
          createService.postEvent(evt).then(function(resp){
            console.log("Event added successfully through service!")
          })
        }
        };//scope.upload
  //////////////////////file upload /////////////////////////////////////////////////////////////

/////////////////////////////////////////// preview handling /////////////////////////////////////////////////////////
$scope.preview = function() {
    var prevFile = document.getElementById('fileItem').files[0];
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = prevFile;
    img.height = 250;
    img.width = 250;
    //console.log("img object to be added", img);
    document.getElementById('preview').removeChild(document.getElementById('preview').firstChild);
    document.getElementById('preview').appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
      //TODO: need to specify preview size
      //file reader
    var reader = new FileReader();
    reader.onload = (function(aImg) {
       return function(e) {
     aImg.src = e.target.result;
     //console.log("reader result:", reader.result);
     };
     })
     (img);
    reader.readAsDataURL(prevFile);
}//handleFiles
}]);
