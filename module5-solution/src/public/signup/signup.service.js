(function () {
"use strict";

angular.module('public')
.service('SignUpDataService', SignUpDataService);

function SignUpDataService() {
  var service = this;
  var userSession;

  service.setUserSession = function(userSession) {
    service.userSession = userSession;
  }

  service.getuserSession = function() {
    return service.userSession;
  }

}

})();
