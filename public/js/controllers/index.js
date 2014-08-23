angular.module('paypal.controllers.index', [])
  .controller('IndexController', ['$scope', '$http', '$state', 'Global', function($scope, $http, $state, Global){
    $scope.global = Global;

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'MM/dd/yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];


  $scope.getAll = function(){
    $http.get('/paypal/activity')
      .success(function(data){
        console.log('get')
      })
      .error(function(data){
        console.log('get error')
      });
  };

  $scope.create = function(){
    $http.post('/paypal/create', {})
      .success(function(data){
        console.log('create')
      })
      .error(function(err){
        console.log('create error')
      });
  };

  $scope.convert = function(){
    $http.get('/paypal/currencyConversion')
      .success(function(data){
        console.log('currencyConversion')
      })
      .error(function(err){
        console.log('convert error')
      });
  }

  $scope.getConversionRate = function(){
    $http.get('/paypal/conversionRate')
      .success(function(data){
        console.log('conversionRate')
      })
      .error(function(err){
        console.log('conversion error')
      });
  }

  }]);
