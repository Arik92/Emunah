app.controller('signCtrl', function($scope){

  function nonEmptyFields() {
    if (!$scope.pass1) {
      alert("password field is needed");
    }
  }//nonEmptyFields

  function checkNames() {
    var patt = /[a-zA-z]+/;
    if ((!patt.test($scope.fname)||(!$scope.fname))) {
      alert("first name must contain one or more letters");
    } else if ((!patt.test($scope.lname)||(!$scope.lname))) {
      alert("last name must contain one or more letters");
    }
  }//checkNames

  function checkEmail() {
      var patt = /[\w.]+@\w+\.\w+/;//(com|net)
      if (!patt.test($scope.email)) {
        return false;
      }//if
        return true;
      // regex pattern: one or more word characters, followed by @, followed by one or more word characters, followed by '.'
      //and by one or more word expressions
  }
  function checkPass() {
    var patt = /\W{8}/;
    if (!patt.test($scope.pass1)) {
      alert("pass not long enough!(at least 8 characters)");
    } else if (($scope.pass1!==$scope.pass2)||(!$scope.pass1)) {
      alert("Password fields must match")
    }
  }

  $scope.checkInput = function() {
    //console.log("first name is now", $scope.fname);
    //nonEmptyFields();
    checkNames();
    checkPass();
     if (!checkEmail()) {
      alert("Must have a valid email address")
    }

  }//checkInput

});
