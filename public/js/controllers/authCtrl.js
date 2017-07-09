app.controller('authCtrl', function($scope, authFactory, $state) {
  $scope.username = authFactory.currentUser.username;
  $scope.join = function() {
        authFactory.join($scope.user)
      .then(function() {
        $state.go('home');
      }, function(err) {
        alert(err.data.message);
      });
  }
  $scope.login = function() {
    authFactory.login($scope.user)
      .then(function() {
        $state.go('home');
      }, function(err) {
        alert(err.data);
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

  $scope.checkSignup = function() {
    checkNames();
    checkPass();
     if (!checkEmail()) {
      alert("Must have a valid email address")
    }

  }//checkInput
});

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
