angular
  .module('worldApp')
  .controller('UserController', UserController)

UserController.$inject = ['User', 'TokenService']
function UserController(User, TokenService) {
  var self = this;

  self.all  = [];
  self.user = {};

  function handleLogin(res) {
    var token = res.token ? res.token:null;
   
    if (token) {
      getUsers();
      self.user = TokenService.getCurrentUser();
    }

    self.message = res.message;
  }

  self.register = function(){
    User.register(self.user, handleLogin)
  }

  self.login = function(){
    User.login(self.user, handleLogin);
  }

  self.disappear = function(){
    TokenService.removeToken();
    self.all  = [];
    self.user = {};
  }

  function getUsers (){
    console.log("GETTING USERS");
    User.query(function(data){
      console.log(data);
      self.all = data.users;
    });
  }
  getUsers()

  self.isLoggedIn = function(){
    return !!TokenService.getToken();
  }
  if (self.isLoggedIn()) {
    getUsers();
    self.user = TokenService.getCurrentUser();
  }

}