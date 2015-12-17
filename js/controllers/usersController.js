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
      getLoggedInUser();
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
    User.query(function(data){
      self.all = data.users;
    });
  }
  getUsers()

  self.isLoggedIn = function(){
    return !!TokenService.getToken();
  }

  function getLoggedInUser() {
    var user = TokenService.getCurrentUser();
    User.get({ id: user._id }, function(res) {
      self.user = res.user;
    });
  }

  if (self.isLoggedIn()) {
    getUsers();
    getLoggedInUser();
  }

  self.editUsers = function(){
    User.update({ id: self.user._id }, self.user, function(res){
      console.log(res);
    })
  }

}