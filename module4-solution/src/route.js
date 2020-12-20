(function(){
  'use strict';


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
      templateUrl:'templates/home.templates.html'
    })
    //category route
    .state('categories', {
      url:'/categories',
      templateUrl: 'templates/total_categories.template.html',
      controller:'MenuDataController as catCtrl',
      resolve : {
        contents: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categories.items', {
      url: '/items/category-{categoryName}',
      templateUrl:'templates/total_items.template.html',
      controller: 'ItemsController as itemsCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams){
          return MenuDataService.getItemsForCategory($stateParams.categoryName);
        }]
      }
    });

  }
})();
