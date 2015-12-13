angular
  .module('worldApp')
  .controller('GameController', GameController);

GameController.$inject = ['$http', '$window'];
function GameController($http, $window){

  var _ = $window._;
  var self = this;
  self.data = [];

  self.selectedCountries = [];

  function getData () {
    $http.get('https://restcountries.eu/rest/v1/all')
      .then(function(res){
        self.data = res.data;
      });
  }

  self.getCountryByName = function(name) {
    return _.where(self.data, { name: name });
  }

  self.getRandomCountries = function() {
    self.data = _.shuffle(self.data);
    self.selectedCountries = _.slice(self.data, 0, 4);
  }

  self.checkWin = function() {
    console.log('click')
  }

  getData();
}