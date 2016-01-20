  angular
  .module('worldApp')
  .controller('GameController', GameController);

GameController.$inject = ['$http', '$window', 'TokenService', 'User', 'AWS'];
function GameController($http, $window, TokenService, User, AWS){

  var _ = $window._;
  var self = this;
  self.data = [];
  self.user = {};
  var user = TokenService.getCurrentUser();
  User.get({ id: user._id }, function(res) {
    self.user = res.user;
  });

  self.selectedCountries = [];
  self.chooseCountry = {};
  self.flagImg = "";
  self.flagPresent = false;


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
    selectQuestion();
  }

  function selectQuestion(){
    var questions = _.shuffle(['areaBig', 'areaSmall', 'popBig', 'popSmall', 'borders', 'borders', 'capital', 'capital', 'latLng', 'flag', 'flag']);
    var ques = _.first(questions);
    switch (ques) {
      case 'areaBig':
        self.question = "Which of these countries is the biggest?";
        break;
      case 'areaSmall':
        self.question = "Which of these countries is the smallest?";
        break;
      case 'popBig':
        self.question =  "Which of these countries has the largest population?";
        break;
      case 'popSmall':
        self.question = "Which of these countries has the smallest population?";
        break;
      case 'borders':
        bordersQuestion();
        break;
      case 'capital':
        capitalQuestion();
        break;
      case 'flag':
        flagQuestion();
        break;
      case 'latLng':
        latLngQuestion();
        break;

    }
  }

  function pickCountry(){
    var shuffle = _.shuffle(self.selectedCountries);
    self.chooseCountry= _.first(shuffle);
    return self.chooseCountry;
  }

  function flagQuestion(){
    pickCountry();
    getFlag();
    return self.question = "Which country does this flag belong to?";
  }

  function getFlag(){
    self.flagPresent = true;
    self.flagImg = AWS + self.chooseCountry.alpha3Code.toLowerCase() + ".svg"
    self.flag = self.flagImg
    
    return self.flagImg
  } 

  function latLngQuestion(){
    pickCountry();
    return self.question = "Which country has a longitude and latitude of: " + self.chooseCountry.latlng.join(", ") + "?"
  }

  function capitalQuestion() {
    pickCountry();
    return self.question = "Which country has a capital of " + self.chooseCountry.capital + "?"
  }

  function bordersQuestion(){
    pickCountry();
    if (self.chooseCountry.borders == 0 ) {
      self.question = "Which country is not bordered by any other country"
    }
    else {
      self.question = "Which country has the following borders? " + self.chooseCountry.borders.map(function(alpha3Code) {
        return _.find(self.data, { alpha3Code: alpha3Code }).name;
      }).join(", ");
    }

    return self.chooseCountry;
  }


  self.checkWin = function (country) {
    switch (self.question) {
      case "Which of these countries is the biggest?":
      areaBigCheckWin(country);
      break;
      case "Which of these countries is the smallest?":
      areaSmallCheckWin(country);
      break;
      case "Which of these countries has the largest population?":
      popBigCheckWin(country);
      break;
      case "Which of these countries has the smallest population?":
      popSmallCheckWin(country);
      break;
      case self.question === "Which country has a capital of " + self.chooseCountry.capital + "?":
      genCheckWin(country);
      break;
      case "Which country has a longitude and latitude of: " + self.chooseCountry.latlng.join(", ") + "?":
      genCheckWin(country);
      break;
      case "Which country does this flag belong to?" + self.flagImg:
      genCheckWin(country);
      break;
      default:
      bordersCheckWin(country);
    }
  }

  function areaBigCheckWin(country) {
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].area === null){
        self.selectedCountries[i].area = 0
      }
    }
    var areaOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'area')));
    if (country.area == areaOfSelectedCountries[3]){
      return displayWin();
    }
    else {
      return incorrect();
    }
  }

  function areaSmallCheckWin(country) {
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].area === null){
        self.selectedCountries[i].area = 0
      }
    }
    var areaOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'area')));
    if (country.area == areaOfSelectedCountries[0]){
      return displayWin();
    }
    else {
      return incorrect();
    }
  }

  function popBigCheckWin(country){
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].population === null){
        self.selectedCountries[i].population = 0
      }
    }
    var popOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'population')));
    if (country.population == popOfSelectedCountries[3]){
      return displayWin();
    }
    else {
      return incorrect();
    }
  }

  function popSmallCheckWin(country) {
    for (i=0; i<self.selectedCountries.length; i++){
      if (self.selectedCountries[i].population === null){
        self.selectedCountries[i].population = 0
      }
    }
    var popOfSelectedCountries = (_.sortBy(_.map(self.selectedCountries, 'population')));
    if (country.population == popOfSelectedCountries[0]){
      return displayWin();
    }
    else {
      return incorrect();
    }
  }

  function genCheckWin(country){
    if (country.name == self.chooseCountry.name){
      return displayWin();
    }
    else {
      return incorrect();
    }
  }

  function bordersCheckWin(country) {
    if (country.borders == self.chooseCountry.borders){
      return displayWin()
    }
    else {
      return incorrect()
    }
  }

  function incorrect(){
    self.user.local.score--;
    self.message = "Incorrect, try again!"
  }

  function displayWin() {
    self.flagPresent = false;
    self.flag = "";
    self.message = "";
    self.user.local.score++;
    User.update({id: self.user._id}, self.user, function (res){
      return self.getRandomCountries()
    }); 
  }
  getData();
}