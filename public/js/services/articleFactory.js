app.factory('articleFactory', function($http) {
  articles = [
    {title: 'shabat',
    content: ['it is wise to keep the sabath', 'and to be content']
  },
    {title: 'kosher',
    content: ['allowed: chicken, cow and potatos', 'not allowed: pig']
  }
];//articles library
var getArticle = function(name) {
  if (articles[name]) {
    return articles[name];
  } else {
    console.log("that article does NOT exist");
  }
});
