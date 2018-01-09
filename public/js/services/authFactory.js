app.factory('authFactory', ['$http', '$rootScope', 'userService', 'authToken', function($http, $rootScope, userService, authToken) {
  var authFactory = {};

  authFactory.login = function(loginData) {
	  console.log("login data service is", loginData);
	  //delete $http.defaults.headers.common["x-access-token"];
    return $http.post('/users/authenticate', loginData).then(function(data){
		console.log("authentication data", data);
      authToken.setToken(data.data.token);
      return data;
    })
  }
//authService.isLoggedIn()
  authFactory.isLoggedIn = function() {
    if (authToken.getToken()) {
		console.log("isLoggedIn ",true);
      return true;
    } else {
	  console.log("isLoggedIn ", false);
      return false;
    }
  };

//authService.getUser();
  authFactory.getUser = function() {
    if (authToken.getToken) {		
      return $http.post('/users/currentUser').then(function(response){
		  console.log("response from GETUSER", response);
		  return response;
	  });
    } else {
      $q.reject({ message: 'User has no token' });
    }
  };
  
 authFactory.logout = function() {    
		  authToken.setToken();		  
          console.log("auth factory logout");
      }
  

  authFactory.joinWhatsapp = function(phone) {
    console.log("phone factory:", phone);
    return $http.post('/users/whatsapp/:'+phone).then(function(response) {
      console.log("whatsapp phone factory passed");
    });
  }//joinWhatsapp

  return authFactory;
}]);

app.factory('authToken', ['$window', function($window) {
  var authTokenFactory = {};
  //authToken.setToken(token)
  authTokenFactory.setToken = function(token) {
    if (token) {		
      $window.localStorage.setItem('token', token);
	  var token2 = $window.localStorage.getItem('token');
	  console.log("set token", token2);
    } else {
      $window.localStorage.removeItem('token');
	  	  console.log("removed token");
    }
  };
  //authToken.getToken()
  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem('token');
  };
  return authTokenFactory;
}]);

app.factory('authServiceInterceptors', ['authToken', function(authToken) {
  var authServiceInterceptors = {};
  authServiceInterceptors.request = function(config) {
    var token = authToken.getToken();
    if (token) config.headers['x-access-token'] = token;
    return config;
  }
  return authServiceInterceptors;
}]);
