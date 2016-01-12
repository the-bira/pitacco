
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('pitacco', ['ionic','ngCordova','app.controllers','ui.router']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('ramo',{
      url:"/",
      templateUrl:'/js/views/ramo.html',
      controller: 'RamoController'
    })
    .state('categoria-negocio',{
      url:"/ramo/:idRamo/categoria-negocio",
      templateUrl: "/js/views/categorias.html",
      controller: "CategoriaController"
    })
    .state('negocios',{
      url:"/negocio",
      params: {
        "categoria":null,
        "ramo":null,
        "search":null,
        "per_page":null,
      },
      templateUrl: "/js/views/negocios.html",
      controller: "NegocioController"
    })
    .state("negocio",{
      url:'/negocio/:id',
      controller: function ($log, $scope) {
        $log.debug('negocio controller');
        $scope.currentTab = 'home';
        $scope.setCurrentTab = function (name) {
          $log.debug('set current tab: ' + name);
          $scope.currentTab = name;
        };
      },
      templateUrl: 'js/views/negocio-tabs.html',
    });
});
