/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('onlineshop',
        ['onlineshop.products',
         'onlineshop.product_categories',
         'onlineshop.common'])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: "/admin",
            templateUrl: "/app/components/home/homeView.html",
            controller: "homeController"
        });
        $urlRouterProvider.otherwise('/admin');
    }
})();

//Có thể viết code theo cách khác
//var myApp = angular.module('onlineshop',
//                           ['onlineshop.products',
//                            'onlineshop.product_categories',
//                            'onlineshop.common'])
//                                                .config(config);
//config.$inject = ['$stateProvider', '$urlRouterProvider'];


//function config($stateProvider, $urlRouterProvider) {
//    $stateProvider.state('home', {
//        url: "/admin",
//        templateUrl: "/app/components/home/homeView.html",
//        controller: "homeController"
//    });
//    $urlRouterProvider.otherwise('/admin');
//}
//myApp.run();