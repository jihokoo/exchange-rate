angular.module('paypal.controllers.index', [])
  .controller('IndexController', ['$scope', '$http', '$state', 'Global', function($scope, $http, $state, Global){
    $scope.global = Global;

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'MM/dd/yyyy', 'shortDate'];
    $scope.format = $scope.formats[3];
    $scope.transaction = {};
    $scope.transactions = [];

    $scope.currencyShortList = [
      {display: 'USD $', code: 'USD'},
      {display: 'INR ₹', code: 'INR'},
      {display: 'CAD $', code: 'CAD'},
      {display: 'CNY CN¥', code: 'CNY'},
      {display: 'EUR €', code: 'EUR'}
    ];

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
          data.convertTo = $scope.currencyShortList[0].code;
          data.convertFrom = $scope.currencyShortList[0].code;
          data.amount = parseFloat(data.amount);
          $scope.transactions.push(data);
        })
        .error(function(err){
          console.log('create error', err);
        });
    };

    $scope.convert = function(transaction){
      $http.post('/paypal/convert', {
        convertFrom: transaction.convertFrom,
        convertTo: transaction.convertTo, 
        amount: transaction.amount
      })
        .success(function(data){
          transaction.convertFrom = transaction.convertTo;
          transaction.amount = data.amount
        })
        .error(function(err){
          console.log('convert error', err)
        });
    };


    $scope.getConversionRate = function(currencyCode){
      $http.get('/paypal/conversionRate/'+currencyCode)
        .success(function(data){
          console.log('conversionRate', data);
        })
        .error(function(err){
          console.log('conversion error', err);
        });
    };

    (function(){
      $http.get('/paypal/activity')
      .success(function(data){
        data.forEach(function(transaction){
          transaction.convertTo = $scope.currencyShortList[0].code;
          transaction.convertFrom = $scope.currencyShortList[0].code;
          $scope.transactions.push(transaction);
        });
      })
      .error(function(err){
        console.log('get error', err)
      });
    })();

  }]);
