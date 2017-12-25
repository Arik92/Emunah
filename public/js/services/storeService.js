app.service('storeService', function(){

  this.products = [
    { name: 'Necklaces ', uiSref: 'store-necklaces' },
    { name: 'Shirts', uiSref: 'store-shirts' },
    { name: 'Books In Hebrew', uiSref: 'store-hebrew' },
    { name: 'Books In English', uiSref: 'store-english' },
    { name: 'Booklets', uiSref: 'store-booklets' },
    { name: 'CDs', uiSref: 'store-cds' },
    { name: 'Illustrations', uiSref: 'store-illustrations' },
    { name: 'Paintings', uiSref: 'store-paintings' },
    { name: 'MP3', uiSref: 'store-mp3' },
    { name: 'PDF', uiSref: 'store-pdf' }
  ];

});
