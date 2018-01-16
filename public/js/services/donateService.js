app.service('donateService', function(){

  this.products = [
    { faIcon: 'fa fa-credit-card', name: 'Credit Card', uiSref: 'donate' },
    { faIcon: 'fa fa-paypal', name: 'PayPal', uiSref: 'donate-paypal' },
    { faIcon: 'fa fa-envelope', name: 'Mail', uiSref: 'donate-mail' },
    { faIcon: 'fa fa-phone', name: 'Phone ', uiSref: 'donate-phone' },
    { faIcon: 'fa fa-university', name: 'Wire Transfer', uiSref: 'donate-transfer' }
  ];

});
