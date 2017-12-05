app.service('linkService', function(){

  this.quickLinks = {};
  this.languages = {};
  this.social = {};
  this.furtherLearning = {};

  this.quickLinks.header = "QuickLinks";
  this.quickLinks.links = [
    { title: 'Rav Dror in USA ', uiSref: 'ravusa' },
    { title: 'Lectures', uiSref: 'usa' },
    { title: 'Services', uiSref: 'services' },
    { title: 'About', uiSref: 'faq' },
    { title: 'Contact', uiSref: 'page-contact' },
    { title: 'Store', uiSref: 'store' },
    { title: 'Donate', uiSref: 'donate' },
  ];

  this.languages.header = "Languages";
  this.languages.links = [
    { title: 'Hebrew', hRef: 'http://emunah.com/he'},
    { title: 'Spanish', hRef: 'http://emunah.com/es'},
    { title: 'Portuguese', hRef: 'http://emunah.com/pt'},
  ];
  
  this.social.header = 'Social';
  this.social.links = [
    { title: 'facebook', hRef: 'https://www.facebook.com/RavDror/'},
    { title: 'youtube', hRef: 'https://www.youtube.com/user/EmunahChannel'},
    { title: 'instagram', hRef: 'https://www.instagram.com/ravdror/'},
    { title: 'twitter', hRef: 'https://twitter.com/ravdror'},
    { title: 'soundcloud', hRef: 'https://soundcloud.com/ravdror'},
  ];


  this.furtherLearning.header = 'Further Learning';
  this.furtherLearning.links = [
    { title: 'Breslov Nation', hRef: 'https://www.youtube.com/channel/UCGsKGecGeQI82Uxr_grd5dw' },
    { title: 'EmunahVersity', hRef: 'https://www.youtube.com/channel/UC0jTjdKHOwP1gIZS1x9bwRg' },
    { title: 'Women Of Emunah', hRef: 'https://www.facebook.com/WomenofEmuna' }
  ]

  this.footerLinks = [ this.quickLinks, this.languages, this.social, this.furtherLearning];

  
});
