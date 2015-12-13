angular
  .module('worldApp', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  })
  .config(MainRouter);

function MainRouter($stateProvider, urlRouterProvider) {
  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'register.html'
    })
    .state('login', {
      url:'/login',
      templateUrl:'register.html'
    })

  $urlRouterProvider.otherwise('/');
}