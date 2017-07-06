app.controller('mailController', function ($scope, $http) {
  console.log("hello!!!");
  $scope.loading = false;
  $scope.send = function(mail) {
    console.log(mail);

    $scope.loading = true;
    $http.post('/sendmail', {
      from: mail.from,
      to: 'arkadi@doublero.com',
      subject: mail.subject,
      text: mail.message
    }).then(res => {
        $scope.loading = false;
        $scope.serverMessage = 'Your email was sent successfully. Thanks for contacting us!';
    }).catch(err => console.log(err));
  }
})
