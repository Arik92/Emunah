app.factory('authFactory', function($http, $rootScope) {
  var auth = {};
  auth.currentUser = {};
  auth.join = function(user) {
    return $http.post('/users/register', user)
      .then(function(response) {
        console.log("Successfully registered", response.data);
        auth.currentUser = angular.copy(response.data);
      });
  };

  auth.login = function(user) {
    return $http.post('/users/login', user)
      .then(function(response) {
        console.log("Successfully logged in", response.data);
        auth.currentUser = angular.copy(response.data);
		var user = {
			username: response.data.username,
			email: response.data.email
		};
		localStorage.setItem("user", JSON.stringify(user));
		console.log("login localstorage", localStorage.user);
        $rootScope.currentUser = user.username;
      });
  };

  auth.getCurrentUser = function() {
    return $http.get('/users/currentUser')
      .then(function(response) {
        auth.currentUser = angular.copy(response.data);
        return response.data;
      })
  }

  auth.logout = function(user) {
    return $http.get('/users/logout')
      .then(function(reponse) {
		  localStorage.removeItem("user");
		  $rootScope.currentUser = null;
          auth.currentUser.email = null;
          console.log("auth logout");
      })
  }

  auth.joinWhatsapp = function(phone) {
    console.log("phone factory:", phone);
    return $http.post('/users/whatsapp/:'+phone).then(function(response) {
      console.log("whatsapp phone factory passed");
    });
  }//joinWhatsapp

  return auth;
});
