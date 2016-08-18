(function (app) {
    app.controller('productEditController', productEditController);

    productEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams', 'commonService'];

    function productEditController($scope, apiService, notificationService, $state, $stateParams, commonService) {
        $scope.product = {}
        $scope.ckeditorOptions = {
            languague: 'vi',
            height: '200px'
        }
        $scope.UpdateProduct = UpdateProduct;
        $scope.GetSeoTitle = GetSeoTitle;
        function GetSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        };
        function UpdateProduct() {
            apiService.put('api/product/update', $scope.product,
                function (result) {
                    notificationService.displaySuccess('Sản phẩm ' + result.data.Name + ' đã được cập nhật.');
                    $state.go('products');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
                });
        }
        function loadProductDetail() {
            apiService.get('api/product/getbyid/' + $stateParams.id, null, function (result) {
                $scope.product = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        };

        function getListProductCategories() {
            apiService.get('api/productcategory/getallparents', null, function (result) {
                $scope.productCategories = result.data;
            }, function () {
                console.log('Cannot get list product category');
            });
        }

        $scope.ChooseImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.product.Image = fileUrl;
                });
            }
            finder.popup();
        }

        getListProductCategories();
        loadProductDetail();
    }

})(angular.module('onlineshop.products'));