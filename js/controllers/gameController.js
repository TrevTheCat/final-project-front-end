angular
  .module('worldApp')
  .controller('GameController', GameController);

GameController.$inject = ['$http'];
function GameController($http){
  var self = this;

  self.data = [];

  function getData () {
    $http.get('https://restcountries.eu/rest/v1/all')
      .then(function(res){
        console.log(res)

      });
  }
  getData();
}