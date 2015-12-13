angular
  .module('worldApp')
  .controller('GameController', GameController);

GameController.$inject = ['$http', '$window'];
function GameController($http, $window){

  var _ = $window._;
  var self = this;
  self.data = [];

  self.selectedCountries = [];
  self.winCounter = 0;
  self.counter = 0;

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
    self.selectQuestion();
  }

  self.selectQuestion = function (){
    var questions = _.shuffle(['areaBig', 'areaSmall']);
    if (_.first(questions)=== 'areaBig'){
      self.question = "Which of these countries is the biggest?";
    }
    else {
      self.question = "Which of these countries is the smallest?";
    }
  }


  self.checkWin = function (country) {
    if (self.question === "Which of these countries is the biggest?") {
      return self.areaBigCheckWin(country);
    }
    else {
      return self.areaSmallCheckWin(country);
    }
  }

  self.areaBigCheckWin = function(country) {
    self.counter++;
    var areaOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'area')));
    if (country.area == areaOfSelectedCountries[3]){
      return self.displayWin();
    }
    else {
      return self.message = "incorrect";
    }
  }

  self.areaSmallCheckWin = function(country) {
    self.counter++;
    var areaOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'area')));
    if (country.area == areaOfSelectedCountries[0]){
      return self.displayWin();
    }
    else {
      return self.message = "incorrect";
    }
  }


  self.displayWin = function() {
    self.winCounter++
    self.message = "correct";
    return self.getRandomCountries()
  }

  getData();
}