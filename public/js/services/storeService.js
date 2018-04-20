app.service('storeService', [function(){

  this.products = [
    { name: 'Illustrations', uiSref: 'store-illustrations' },
    { name: 'Paintings', uiSref: 'store-paintings' },
    { name: 'Judaica', uiSref: 'store-judaica' },
    { name: 'Necklaces ', uiSref: 'store-necklaces' },
    { name: 'Shirts', uiSref: 'store-shirts' },
    { name: 'Books In Hebrew', uiSref: 'store-hebrew' },
    { name: 'Books In English', uiSref: 'store' },
    { name: 'Booklets', uiSref: 'store-booklets' },
    { name: 'CDs', uiSref: 'store-cds' },
    { name: 'Downloadable Audio', uiSref: 'store-mp3s' },
    { name: 'Downloadable Books', uiSref: 'store-pdf' }
  ];

}]);
