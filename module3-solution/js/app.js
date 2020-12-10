(function() {
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItems);


// found items directive
function FoundItems(){
  var ddo = {
    templateUrl: 'load.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsReponseController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsReponseController(){
  var empty = this;

empty.emptyList = function() {
  return typeof empty.items !== 'undefined' && empty.items.length === 0;
}
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;


//user informative sign
list.informative = "please input some data";
//search functionality
list.searchTerm = "";
  list.narrowDown = function(searchTerm){
    //inform user of the ongoing search
    list.informative = "searching please wait!";


    //setup promise to return response
  var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

  promise.then(function (response){
    if (searchTerm !== "") {

      //assign value from response to found
      list.found = response;
      list.informative = "";
    }else{
      //inform user to input something
      list.informative = "Please input some data";
    }

  })
  .catch(function(error){
    console.log("Some error incurred"+error);
  });
};

//remove item functionality
list.removeItem = function(itemIndex){
  this.lastRemove = "Last item remove was "+ list.found[itemIndex].name;
  list.found.splice(itemIndex,1);
}

}

//injecting the $http and api base into the search service
MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http,ApiBasePath){

  var service = this;


  service.getMatchedMenuItems = function (searchTerm){
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then( function (response){
      var foundItems = [];
      //get the size of menu items in total
      var size = response.data.menu_items.length;
      for (var i = 0; i < size; i++) {
        var data = response.data.menu_items[i];
        //get the item matching the specified searrTerm index
        if (data.description.indexOf(searchTerm) !== -1) {
          //item found
          //push it to itemList
          foundItems.push(data);
        }
      }
      //return the list
      return foundItems;
    });


  };

}

})();
