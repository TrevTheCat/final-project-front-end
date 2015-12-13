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
    var questions = _.shuffle(['areaBig', 'areaSmall', 'popBig', 'popSmall']);
    var ques = _.first(questions)
    if (ques === 'areaBig'){
      self.question = "Which of these countries is the biggest?";
    }
    else if (ques === 'areaSmall'){
      self.question = "Which of these countries is the smallest?"
    }
    else if (ques === 'popSmall') {
      self.question = "Which of these countries has the smallest population?"
    }
    else {
      self.question = "Which of these countries has the largest population?";
    }
  }


  self.checkWin = function (country) {
    if (self.question === "Which of these countries is the biggest?") {
      return self.areaBigCheckWin(country);
    }
    else if (self.question === "Which of these countries is the smallest?") {
      return self.areaSmallCheckWin(country);
    }
    else if (self.question === "Which of these countries has the largest population?") {
      return self.popBigCheckWin(country)
    }
    else if (self.question === "Which of these countries has the smallest population?") {
      return self.popSmallCheckWin(country)
    }

  }

  self.areaBigCheckWin = function(country) {
    self.counter++;
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].area === null){
        self.selectedCountries[i].area = 0
      }
    }
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
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].area === null){
        self.selectedCountries[i].area = 0
      }
    }
    var areaOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'area')));
    if (country.area == areaOfSelectedCountries[0]){
      return self.displayWin();
    }
    else {
      return self.message = "incorrect";
    }
  }

  self.popBigCheckWin = function(country) {
    self.counter++;
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].population === null){
        self.selectedCountries[i].population = 0
      }
    }
    var popOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'population')));
    if (country.population == popOfSelectedCountries[3]){
      return self.displayWin();
    }
    else {
      return self.message = "incorrect";
    }
  }
  self.popSmallCheckWin = function(country) {
    self.counter++;
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].population === null){
        self.selectedCountries[i].population = 0
      }
    }
    var popOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'population')));
    if (country.population == popOfSelectedCountries[0]){
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