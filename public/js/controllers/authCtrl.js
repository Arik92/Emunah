app.controller('authCtrl', function($scope, authFactory, userService, $state, $timeout, $location) {	
	this.$onInit = () => {
	 $scope.newMember = {};
 }
  /*function validateLogin() {
    var patt = /\w{8}/;
    console.log("user is", $scope.user);
    if (!checkEmail($scope.user.username)) {
      return true;
    }else if (!patt.test($scope.user.password)) {
      alert("Password is either missing or not long enough(at least 8 charatcers)");
      return true;
    } else {
      return false;
    }
  }//validateLogin
  
  function checkNames() {
    var patt = /[a-zA-Z]/;
    console.log("first name is", $scope.newMember.fname);
    console.log("first name test:", patt.test($scope.newMember.fname));
    console.log("last name test:", patt.test($scope.newMember.lname));
    if (!$scope.newMember.fname) {
      alert("fill in first name");
      $scope.checkFail = true;
    } else if (!patt.test($scope.newMember.fname)) {
      alert("first name must only contain english letters");
      $scope.checkFail = true;
    }else if (!$scope.newMember.lname) {
      alert("fill in last name");
      $scope.checkFail = true;
    }else if (!patt.test($scope.newMember.lname)) {
      alert("last name must only contain english letters");
      $scope.checkFail = true;
    }//else if
  }//checkNames

  function checkEmail(email) {
      var patt = /[\w.]+@\w+\.\w+/;//(com|net)
      if (!patt.test(email)) {
        alert("Must have a valid email address")
          $scope.checkFail = true;
      }//if
        return true;
      // regex pattern: one or more word characters, followed by @, followed by one or more word characters, followed by '.'
      //and by one or more word expressions
  }
  function checkPass() {
    var patt = /\w{8}/;
    if ((!patt.test($scope.newMember.pass)||(!$scope.newMember.pass))) {
      alert("pass not long enough! (must be at least 8 characters)");
      $scope.checkFail = true;
    } else if (($scope.newMember.pass!==$scope.newMember.pass2)) {
      alert("Password fields must match")
        $scope.checkFail = true;
    }
  }

  $scope.checkSignup = function() {
    $scope.checkFail = false;
    checkNames();
    if (!$scope.checkFail){
      checkEmail($scope.newMember.email);
    }
    if (!$scope.checkFail) {
      checkPass();
    }
    if (!$scope.checkFail) {
      console.log("user has been added", $scope.newMember);
      $scope.join($scope.user);
    }
  }//checkInput */
  $scope.registerUser = function (newMember) {
   // app.loading = true;
   // app.errorMsg = false;
    userService.create(newMember).then(function(data) {
		console.log("data for signup", data.config.data.username);
		var loginObj = {
			"username": data.config.data.username,
			"password": data.config.data.password
		};
      if (data.data.success) {
        app.loading = false;
        //create success message
        //redirect to home page
        app.successMsg = data.data.message + ' ...Redirecting';
		authService.login(loginObj).then(function(result){
			$timeout(function() {			
          $location.path('/');
        }, 2000);
		});        
      } else {
        //app.loading = false;
        //create error message
        //app.errorMsg = data.data.message;
		console.log("an error occured");
      }
    });
  }; //registerUser
  $scope.login = function (loginData) {
	  //console.log("login data looks like", loginData);
    //msg.loading = true;
    //msg.errorMsg = false;
		authService.login(msg.loginData).then(function(data) {
      if (data.data.success) {
        msg.loading = false;
        //create success message
        //redirect to home page
        msg.successMsg = data.data.message + ' ...Redirecting';
        $timeout(function() {
          $location.path('/');
          msg.loginData = '';
          msg.successMsg = false;
        }, 2000);
      }  else {
        //msg.loading = false;
        //create error message
        //msg.errorMsg = data.data.message;
      }
    });
  };
	this.logout = function() {
    localStorage.removeItem("user");
    $rootScope.currentUser = null;
     delete $http.defaults.headers.common.Authorization;
    authService.logout();
    $location.path('/');
  }//logout
      
	
$scope.joinWhatsapp = function() {
  var patt = /^\+[1-9][0-9]{0,2}\.?[0-9]{1,14}$/; //no country code starts with 0
  if (patt.test($scope.phone)) {
    authFactory.joinWhatsapp($scope.phone).then(function(err, res){
      if (err) {
        console.log(err);
      } else {
        alert("your phone has been added!");
      }
    })
  } else {
    alert("Please enter a phone number in international format(see example) ");
  }//else patt test
}//joinWhatsapp
}); //authCtrl

// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '671277003082097',
//       xfbml      : true,
//       version    : 'v2.9'
//     });
//     FB.AppEvents.logPageView();
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>
//
// secret: 3587b03e9bd14c9b0b4ca0f373904dd3
