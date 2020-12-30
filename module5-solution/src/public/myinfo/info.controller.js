(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignUpDataService', 'ApiPath'];

function MyInfoController(SignUpDataService, ApiPath) {
  var $ctrl = this;
  $ctrl.userSession = SignUpDataService.getuserSession();
  $ctrl.basePath = ApiPath;
}

})();
