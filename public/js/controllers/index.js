angular.module('paypal.controllers.index', [])
  .controller('IndexController', ['$scope', '$http', '$state', 'Global', function($scope, $http, $state, Global){
    $scope.global = Global;

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'MM/dd/yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];
  $scope.transaction = {};
  $scope.transactions = [];

  (function(){
    $http.get('/paypal/activity')
    .success(function(data){
      data.forEach(function(transaction){
        transaction.amount = '$ ' + transaction.amount
        $scope.transactions.push(transaction);
      });
    })
    .error(function(err){
      console.log('get error', err)
    });
  })();

  // i can do something here with $scope.$watch('select') maybe....
  // i catually don't want to do that

  $scope.format = function(date){
    var d = new Date(date);
    var date = d.getDate() + 1;
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var formattedString = month + '/' + date + '/' + year;
    return formattedString;
  };

  $scope.create = function(){
    $http.post('/paypal/create', {
      type: $scope.transaction.type,
      subject: $scope.transaction.subject,
      date: $scope.transaction.date,
      amount: $scope.transaction.amount
    })
    .success(function(data){
      console.log(typeof data.date)
      $scope.transactions.push(data);
    })
    .error(function(err){
      console.log('create error', err)
    });
  };


  $scope.convert = function(){
    $http.post('/paypal/currencyConversion')
      .success(function(data){
        console.log('currencyConversion', data)
      })
      .error(function(err){
        console.log('convert error', err)
      });
  };


  $scope.getConversionRate = function(){
    $http.get('/paypal/conversionRate/')
      .success(function(data){
        console.log('conversionRate', data)
      })
      .error(function(err){
        console.log('conversion error', err)
      });
  };

  }]);
