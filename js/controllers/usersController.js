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
      console.log(res);
      self.getUsers();
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

  self.getUsers = function(){
    User.query(function(data){
      self.all = data.users;
      console.log(data.users)
    });
  }

  self.isLoggedIn = function(){
    return !!TokenService.getToken();
  }
  if (self.isLoggedIn()) {
    self.getUsers();
    self.user = TokenService.getCurrentUser();
  }

  self.updateScore = function() {
    User.update({ id: user._id}, user, function() {

    });
  }

  // this.findAndUpdate = function(){
  //   var character = Character/get({ id:id }, function (character) {
  //     //do some stuff..
  //     character.name = "new Name";
  //     character.$save(function() {
  //       //update view
  //     });
  //   });
  // };
}