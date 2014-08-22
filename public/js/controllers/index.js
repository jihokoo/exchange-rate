angular.module('paypal.controllers.index', [])
  .controller('IndexController', ['$scope', '$http', '$state', 'Global', function($scope, $http, $state, Global){
    $scope.global = Global;

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'MM/dd/yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];


  $scope.initialize = function(){
    $http.get('/paypal/activity')
      .success(function(data){

      })
      .error(function(data){

      });
  };

  $scope.submit = function(){
    $http.post('/paypal/create', {})
      .success(function(data){
        console.log(data);
      })
      .error(function(err){
        console.log(err);
      });
  };

  $scope.convert = function(){
    $http.get('/paypal/currencyConversion', {})
      .success(function(data){
        console.log(data);
      })
      .error(function(err){
        console.log(err);
      });
  }

  $scope.conversionRate = function(){
    $http.get('/paypal/conversionRate', {})
      .success(function(data){
        console.log(data);
      })
      .error(function(err){
        console.log(err);
      });
  }

  }]);
