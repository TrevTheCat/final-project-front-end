angular
  .module('worldApp', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api') 
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  });

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'register.html'
    })
    .state('login', {
      url:'/login',
      templateUrl:'login.html'
    })
    .state('game', {
      url: '/game',
      templateUrl: 'game.html',
      controller: 'GameController as game'
    });

  $urlRouterProvider.otherwise('/');
}