app.controller('authCtrl', function($scope, authFactory, $state) {
  $scope.join = function() {
    console.log("joining control user is", $scope.newMember);
      authFactory.join($scope.newMember)
      .then(function() {
        $state.go('home');
      }, function(err) {
        alert(err.data.message);
      });
  }
  $scope.login = function() {
    console.log("login control user is", $scope.user);
    authFactory.login($scope.user) //how do I know where this user comes from? where does it come from in emunah??
      .then(function() {
        $state.go('home')
      }, function(err) {
        console.log(err);
      });
  }
  $scope.logout = function() {
    console.log("logging out");
    authFactory.logout($scope.user)
      .then(function() {
        console.log("logged out");
        $state.go('home', {}, {
          reload: true
        });
      }, function(err) {
        alert(err.data);
      });
  }
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

  function checkEmail() {
      var patt = /[\w.]+@\w+\.\w+/;//(com|net)
      if (!patt.test($scope.newMember.email)) {
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
      checkEmail();
    }
    if (!$scope.checkFail) {
      checkPass();
    }
    if (!$scope.checkFail) {
      console.log("user has been added", $scope.newMember);
      $scope.join($scope.user);
    }
  }//checkInput

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
$scope.newMember = {};
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
