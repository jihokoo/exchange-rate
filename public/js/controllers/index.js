angular.module('buzzfeed.controllers.index', [])
  .controller('IndexController', ['$scope', '$http', '$state', 'Global', function($scope, $http, $state, Global){
    $scope.global = Global;
  }])
