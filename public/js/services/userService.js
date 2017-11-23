app.factory('userService', function($http){
  userFactory = {};

  //userService.create(regData);
  userFactory.create = function(regData) {
    return $http.post('/users/users', regData).then(function(result){
		console.log("result from registering,", result);
		return result;
	});
  };

  userFactory.getUserByName = function(userName) {
    return $http.get('/users/searchByName/'+userName).then(function(result){
      console.log("result from the factory is", result);
      return result.data;
    });
  };

  return userFactory;
});
