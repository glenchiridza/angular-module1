(function() {
'use strict';

//atleast five items to populate the itemList
var shopList = [
  {
  "name":"cookies",
  "quantity":11
},
{
  "name": "biscuits",
  "quantity": 12
},
{
  "name":"chocolate",
  "quantity": 2
},
{
  "name": "sweets",
  "quantity": 10
},
{
  "name": "apples",
  "quantity": 18
}
];

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var buying = this;
  //get the shopList items from the service
  buying.shoppingList = ShoppingListCheckOffService.getShopItems();

  //remove bought item and send to already Bought
  buying.removeItem = function (itemIndex){
    //get itemIndex and populate the new array before removal
    ShoppingListCheckOffService.addItemBought(itemIndex);
    //remove the item and specified index
    ShoppingListCheckOffService.removeItemAt(itemIndex);
  };

  //check if list is now empty
   buying.isEmpty = function(){

    if (buying.shoppingList.length == 0) {
       return true;
     }
     return false;
   };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){

  var bought = this;
  //get the items from service after buying
  bought.cart = ShoppingListCheckOffService.getItemsBought();

//check if list is empty, nothing bought
  bought.isEmpty = function(){
    if (bought.cart == 0) {
      return true;
    }
    return false;
  }
}

function ShoppingListCheckOffService(){
  var service = this;
  // keep track of bought items
  var alreadyBought = [];
//populate the shopItems with the prescribed shopList array
  service.getShopItems = function(){
    return shopList;
  };

//function to remove item at $index
  service.removeItemAt = function(itemIndex){

      shopList.splice(itemIndex, 1);

  };

  //add items that were Bought
  service.addItemBought = function(itemIndex){

    // var cart = {
    //   "name":shopList[itemIndex].name,
    //   "quantity":shopList[itemIndex].quantity
    // };


    alreadyBought.push(shopList[itemIndex]);

  }

  //retrieve items in cart
  service.getItemsBought =function(){

    return alreadyBought;
  }

}

})();
