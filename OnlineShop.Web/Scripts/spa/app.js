/// <reference path="../plugins/angular/angular.js" />
var myapp = angular.module('myModule', []);

myapp.controller('schoolController', schoolController);
myapp.service('validatorService', validatorService);
myapp.directive('teduShopDirective', teduShopDirective);

schoolController.$inject['$scope', 'validatorService'];

//declare
function schoolController($scope, validatorService) {
    $scope.num = 1;
    $scope.checkNumber = function () {
        $scope.message = validatorService.checkNumber($scope.num);
    }
}

function validatorService() {

    return {
        checkNumber: checkNumber
    }
    function checkNumber(input) {
        if (input % 2 == 0) {
            return "This is even";
        }
        else
            return 'This is odd';
    }
}

function teduShopDirective() {
    return {
        restrict: "A",
        templateUrl: "/Scripts/spa/teduShopDirective.html"
    }
}