(function (){
  'use strict';

  angular.module('Data')
  .constant('ApiResource','https://davids-restaurant.herokuapp.com/')
  .service('MenuDataService',MenuDataService);

  MenuDataService.$inject = ['$http','ApiResource'];
  function MenuDataService ($http, ApiResource){
    var service = this;

    service.contents = [];
    service.items = [];
    service.getAllCategories = function (){

      var contents = $http({
        method: 'GET',
        url: (ApiResource + 'categories.json')
      }).then (
        function (response){
          service.contents = response.data;
          return service.contents;
        }
      );
      return contents;
    };

    service.getItemsForCategory = function (categoryName){

      var items = $http({
        method: 'GET',
        url: (ApiResource + 'menu_items.json?category=' + categoryName)
      })
      .then (
        function(response) {
          service.items = response.data;
          return service.items;
        }
      );

      return items;
    };

  }
})();
