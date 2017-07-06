app.controller('mailController', function ($scope, $http) {
  $scope.loading = false;
  $scope.send = function(mail) {
    $scope.loading = true;
    $http.post('/sendmail', {
      from: 'It is Arik <mbreslow56@gmail.com>',
      to: 'mrarkadi@gmail.com',
      subject: 'Message from maynard?',
      text: mail.message
    }).then(res => {
        $scope.loading = false;
        $scope.serverMessage = 'Your email was sent successfully. Thanks for contacting us!';
    }).catch(err => console.log(err));
  }
})
