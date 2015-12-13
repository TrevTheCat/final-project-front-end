angular
  .module('worldApp', ['angular-jwt', 'ngResource'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  })

function MainRouter($stateProvider, urlRouterProvider) {
  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'register.html'
    })
}