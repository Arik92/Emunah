app.factory('articleFactory', function($http) {
  var articles = {
    'shabat':
    {
      title: 'shabat',
      content: ['it is wise to keep the sabath', 'and to be content']
    },
    'kosher': {
      title: 'Kosher - Eating Jewishly',
      content: ['allowed: chicken, cow and potatos', 'not allowed: pig']
    }
};//articles library
var getArticle = function(name) {
  console.log("name before splitting: ", name);
  //name = name.split('').splice(1,name.length-1).join("");   //removing ':'

    if (articles[name]) {
      return articles[name];
    } else {
      console.log("that article does NOT exist");
    }
}
  return {
    getArticle: getArticle
  }
});
