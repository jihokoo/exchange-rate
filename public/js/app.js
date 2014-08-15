window.app = angular.module('paypal',
  ['ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  'paypal.controllers',
  'paypal.services'
  ]);

angular.module('paypal.controllers',
  ['paypal.controllers.index',
  'paypal.controllers.navbar'
  ]);

angular.module('paypal.services',
  ['paypal.services.global'
  ]);