/// <reference path="../plugins/angular/angular.js" />
var myapp = angular.module('myModule', []);

myapp.controller('schoolController', schoolController);
myapp.controller('studentController', studentController);
myapp.controller('teacherController', teacherController);


//declare
function schoolController($scope) {
    $scope.message = "This is message from School";
}

function studentController($scope){
    $scope.message = "This is message from Student";
}
function teacherController($scope) {
    $scope.message = "This is message from Teacher";
}