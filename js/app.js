angular
  .module('worldApp', ['angular-jwt', 'ng-Resource'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  })