
(function () {
'use strict';

angular.module("LunchCheck",[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
// scope variables first initialized to null
$scope.response = "";
$scope.menuList = "";
// list check function that calls checkFunction to analyze contents
$scope.ListCheck = function (data){
  //split the menulist data and initialize contents to data variable
  data = $scope.menuList.split(",");
  //pass data to  checkFunction
  $scope.response  = checkFunction(data);
}

//if unitended error occurs
  return "Error incurred";
};


//function to check the number of contents
function checkFunction(data){

  var listing = [];
  var contents = [];
  var response;

  if (data == "") {
     //handle when there is no input
     response = "Please enter data first";

  }else{
    //push the data into array
   contents.push(data);
   //loop through the contents and push to listings array list
   for (var i = 0; i < contents[0].length; i++) {


     listing.push(contents[i]);

   }
   if (listing.length <= 3) {
     //handle response when contents are less than 3
    response = "Enjoy!";
  }
  else if (listing.length > 3) {

      //handle response when contents are greater than 3
      response = "Too much!";
  }
}
//return back the response
return response;
}

})();
