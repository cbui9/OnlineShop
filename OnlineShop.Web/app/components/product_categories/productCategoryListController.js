﻿/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.controller('productCategoryListController', productCategoryListController);
    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter']

    function productCategoryListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        $scope.productCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.keyword = '';

        $scope.search = search;
        function search() {
            getProductCategories();
        };

      

        $scope.deleteProductCategory = deleteProductCategory;
        function deleteProductCategory(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id:id
                    }
                }
                apiService.del('api/productcategory/delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    search();
                }, function () {
                    notificationService.displayError('Xóa không thành công')
                });
            });
        };

        $scope.getProductCategories = getProductCategories;
        function getProductCategories(page) {
            page = page || 0;
            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 4
                }
            };
            apiService.get('api/productcategory/getall', config, function (result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning("Không có bản ghi nào được tìm thấy");
                }
                else
                {
                    notificationService.displaySuccess("Đã tìm thấy " + result.data.TotalCount + " bản ghi.");
                }
                $scope.productCategories = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
            }, function () {
                console.log('Load product category failed!');
            });
        }

        $scope.$watch("productCategories", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $('#bntDelete').removeAttr('disabled');
            } else {
                $('#bntDelete').attr('disabled', 'disabled');
            }
        }, true);

        $scope.selectAll = selectAll;
        $scope.isAll = false;
        function selectAll() {
            if ($scope.isAll === false)
            {
                angular.forEach($scope.productCategories, function (item)
                {
                    item.checked = true;
                });
                $scope.isAll = true;
            }
            else
            {
                angular.forEach($scope.productCategories, function (item)
                {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }

        $scope.deleteMultiple = deleteMultiple;

        function deleteMultiple() {
            var listId = [];
            $.each($scope.selected, function (i, item) {
                listId.push(item.ID);
            });
            var config = {
                params: {
                    checkedProductCategories: JSON.stringify(listId)
                }
            }
            apiService.del('api/productcategory/deletemulti', config, function (result) {
                notificationService.displaySuccess('Xóa thành công ' + result.data + ' bản ghi');
                search();
            }, function (error) {
                notificationService.displayError('Xóa không thành công')
            });
        };

        $scope.getProductCategories();
    }
})(angular.module('onlineshop.product_categories'));