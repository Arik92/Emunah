app.service('linkService', [function(){

  this.quickLinks = {};
  this.languages = {};
  this.associatedFacebook = {};
  this.associatedYT = {};

  this.quickLinks.header = "QuickLinks";
  this.quickLinks.icon = 'fa fa-link'
  this.quickLinks.links = [
    { title: 'Rav Dror in USA ', uiSref: 'ravusa' },
    { title: 'Lectures', uiSref: 'usa' },
    { title: 'Services', uiSref: 'services' },
    { title: 'About', uiSref: 'faq' },
    { title: 'Contact', uiSref: 'page-contact' },
    { title: 'Store', uiSref: 'store' },
    { title: 'Donate', uiSref: 'donate' },
  ];

  this.languages.header = "International Pages";
  this.languages.icon = "fa fa-globe";
  this.languages.links = [
    { title: 'Hebrew', hRef: 'http://he.emunah.com/'},
    { title: 'Spanish', hRef: 'http://es.emunah.com/'},
    { title: 'Portuguese', hRef: 'http://pt.emunah.com/'},
  ];
  
  this.associatedFacebook.header = 'Associated Facebook ';
  this.associatedFacebook.icon = "fa fa-facebook-square";
  this.associatedFacebook.links = [
    { title: 'Women Of Emunah', hRef: 'https://www.facebook.com/WomenofEmuna' },
    { title: 'Breslov Nation', hRef: 'https://www.facebook.com/BreslovNation/' },
    { title: 'Emunah Deutsch', hRef: 'https://www.facebook.com/EmunahDeutsch/' },
    { title: 'Emunah Los Angeles', hRef: 'https://www.facebook.com/EmunahCenterLA/' },
    { title: 'Emunah Español', hRef: 'https://www.facebook.com/EmunahEspanol/' },
  ]

  this.associatedYT.header = 'Associated Youtube';
  this.associatedYT.icon = "fa fa-youtube-square ";
  this.associatedYT.links = [
    { title: 'Breslov Nation', hRef: 'https://www.youtube.com/channel/UCGsKGecGeQI82Uxr_grd5dw' },
    { title: 'ערוץ האמונה', hRef: 'https://www.youtube.com/channel/UC10JA3f_3lyX0N6reAk8FVw' },
    { title: 'Emunah Español', hRef: 'https://www.youtube.com/channel/UC_W-TeyM9f-cQ3vyUPg-Nfg' },
    { title: 'Эмуна русский', hRef: 'https://www.youtube.com/channel/UCJDJLXoLU7BPimDUOq5y9-Q' },
    { title: 'Emunah Deutsch', hRef: 'https://www.youtube.com/channel/UCEzVeSRUvEVOa2VSbUHW6nQ' },
    { title: 'Emunah Français', hRef: 'https://www.youtube.com/channel/UCUEs8geQy9uNAdjHUk3wUYg' },
    { title: 'Emunah Português', hRef: 'https://www.youtube.com/channel/UC-p8_IFYDifIA9QF-g7SaWA' },
    { title: 'EmunahVersity', hRef: 'https://www.youtube.com/channel/UC0jTjdKHOwP1gIZS1x9bwRg' },
  ];

  this.socialMedia = [
    { title: 'facebook', hRef: 'https://www.facebook.com/ravdror', faIcon: 'fa fa-facebook-square fa-2x' },
    { title: 'twitter', hRef: 'https://www.twitter.com/ravdror', faIcon: 'fa fa fa-twitter-square fa-2x' },
    { title: 'instagram', hRef: 'https://www.instagram.com/ravdror', faIcon: 'fa fa-instagram fa-2x' },
    { title: 'youtube', hRef: 'https://www.youtube.com/EmunahChannel', faIcon: 'fa fa-youtube fa-2x' },
    { title: 'soundcloud', hRef: 'https://www.soundcloud.com/ravdror', faIcon: 'fa fa-soundcloud fa-2x' }
  ];


  this.footerLinkColumns = [ this.quickLinks, this.languages, this.associatedFacebook, this.associatedYT];

  
}]);


/* this.social.links = [
  { title: 'facebook', hRef: 'https://www.facebook.com/RavDror/'},
  { title: 'youtube', hRef: 'https://www.youtube.com/user/EmunahChannel'},
  { title: 'instagram', hRef: 'https://www.instagram.com/ravdror/'},
  { title: 'twitter', hRef: 'https://twitter.com/ravdror'},
  { title: 'soundcloud', hRef: 'https://soundcloud.com/ravdror'},
]; */