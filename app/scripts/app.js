(function () {
'use strict';

angular.module('app', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'app.controllers',
  'app.directives'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// setup dependency injection
angular.module('d3', []);
angular.module('app.controllers', []);
angular.module('app.directives', ['d3']);



}());