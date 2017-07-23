var app = angular.module('test_app', ['ngRoute','ngStorage']);
app.constant('api_server', 'http://localhost:3000');
app.config(
    ['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {    
      $routeProvider.
        when('/', {
            templateUrl: 'views/step1.html',
            controller:'Step1Controller'
        }).
        when('/step2', {
          templateUrl: 'views/step2.html',
          controller:'Step2Controller'
        }).
        otherwise('/');
        $locationProvider.html5Mode(true);
    }
  ]);
app.run(function($rootScope) {
    $rootScope.step = 1;
});