angular.module('radio.controller')

	.controller('ProductsCtrl', function(Shop, $scope) {

        $scope.main_products = {};

        var page = 0;

        Shop.getProducts({
        	'params':{
        		'page':++page
        	}
        }).then(function(data) {
        	$scope.main_products.products = data.results;
        })

        console.log("MainIntroProduct!!!");
})