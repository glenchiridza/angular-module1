(function () {
  'use strict'

  angular.module('Data')
  .controller('MenuDataController', MenuDataController)

  MenuDataController.$inject = ['contents']
  function MenuDataController (contents) {
    var categories = this;
    categories.contents = contents;
  }
})();
