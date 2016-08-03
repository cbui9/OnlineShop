/// <reference path="../plugins/angular/angular.js" />
var myapp = angular.module('myModule', []);

myapp.controller('schoolController', schoolController);
myapp.service('Validator', Validator);

schoolController.$inject['$scope', 'Validator'];

//declare
function schoolController($scope, Validator){
    $scope.num = 1;
    $scope.checkNumber = function () {
        $scope.message = Validator.checkNumber($scope.num);
    }
}

function Validator() {

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

