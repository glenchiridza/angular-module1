(function(){
  'use strict';

  angular.module('MenuApp',['ui-router']);

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider) {

//default route
    $urlRouterProvider.otherwise('/');

//home route
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl:'home.html'
    })
    //category route
    .state('categories', {
      url:'/categories',
      controller:'MenuDataController as catCtrl',
      resolve : {
        list: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categories.items', {
      url: 'items/category-{categoryName}',
      templateUrl:'items.html',
      controller: 'Itemscontroller as itemsCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function (MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.categoryName);
        }]
      }
    })

  }
})();
