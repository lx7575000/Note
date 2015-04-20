var myApp = angular.module('myApp', ['ngRoute']);
//先创建app主模块
  myApp.controller('mainController', ['$scope', function($scope){
    //创建controller,作为上游的Controller。方便与后面的分页共享一些数据
    $scope.message = 'Everyone come and see how good I look !';
  }]);

  myApp.config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
      })
      .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
      })
      .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
      });
  });

  myApp.controller('aboutController', function  ($scope) {
    $scope.message = 'Look ! I am an about page !';
  });

  myApp.controller('contactController', function($scope){
    $scope.message = 'Contact us ! LX.This is just a demo.';
  });
