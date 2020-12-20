(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$stateParams', 'contents', 'items'];
  function ItemsController ($stateParams, contents, items) {
    var itemsCtrl = this;
    itemsCtrl.items = items.menu_items;
    var category = contents.filter((item) => { return item.short_name === $stateParams.categoryName });
    itemsCtrl.name = category[0].name;
  }
})();
