angular
  .module('worldApp')
  .controller('GameController', GameController)
  .constant('_', window._);

GameController.$inject = ['$http'];
function GameController($http){

  var self = this;
  self.data = [];
  var self._ = _;

  function getData () {
    $http.get('https://restcountries.eu/rest/v1/all')
      .then(function(res){
        console.log(res)
        var info = res;

        console.log(_.first(res))

      });
  }
  getData();
}