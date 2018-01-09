app.factory('articleFactory', ['$http', function($http) {

// var getArticle = function(name) {
//   console.log("name before splitting: ", name);
//   //name = name.split('').splice(1,name.length-1).join("");   //removing ':'
//
//     if (articles[name]) {
//       return articles[name];
//     } else {
//       console.log("that article does NOT exist");
//     }
// } //NOTE no idea what this is. Either delete or will be used for search functionality
  function postArticle(article) {
    return $http.post('/articles', article).then(function(result) {
  console.log("service result");
  return result.data;
}, function(error) {
  console.error(error);
  throw (error);
}) // add promise
  }
  return {
    postArticle: postArticle
  }
}]);
