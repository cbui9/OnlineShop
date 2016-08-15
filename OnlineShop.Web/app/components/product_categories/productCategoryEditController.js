/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function (app) {
    app.controller('productCategoryEditController', productCategoryEditController);

    productCategoryEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams','commonService'];

    function productCategoryEditController($scope, apiService, notificationService, $state, $stateParams,commonService) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true
        }

        $scope.UpdateProductCategory = UpdateProductCategory;
        function UpdateProductCategory() {
            apiService.put('api/productcategory/update', $scope.productCategory,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    $state.go('product_categories');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        };
        $scope.GetSeoTitle = GetSeoTitle;
        function GetSeoTitle() {
            $scope.productCategory.Alias = commonService.getSeoTitle($scope.productCategory.Name);
        };

        function loadProductCategoryDetail() {
            apiService.get('api/productcategory/getbyid/' + $stateParams.id, null, function (result) {
                $scope.productCategory = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        };

        function loadParentCategory() {
            apiService.get('api/productcategory/getallparents', null, function (result) {
                $scope.parentCategories = result.data;
            }, function () {
                console.log('Cannot get list parent');
            });
        };

        loadParentCategory();
        loadProductCategoryDetail();
    }

})(angular.module('onlineshop.product_categories'));