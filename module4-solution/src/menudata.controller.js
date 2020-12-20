(function () {
  'use strict';

  angular.module('Data')
  .controller('MenuDataController', MenuDataController);

  MenuDataController.$inject = ['contents'];
  function MenuDataController (contents) {
    var catCtrl = this;
    catCtrl.contents = contents;
  }
})();
