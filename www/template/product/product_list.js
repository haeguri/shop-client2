angular.module('radio.controller')

	.controller('ProductListCtrl', function(Product, $scope, $location) {

        $scope.product_list = {};
        $scope.product_list.isTagView = false;
        $scope.product_list.currentTag = {}

        console.log("Main Product List !!!");

        var page = 1;
        var tag = $location.search().tag || undefined;
        var brand = $location.search().brand || undefined;
        var params = {
            'params': {
                'page':page,
                'tag':tag,
                'brand':brand
            }
        };

        params.params.tag == undefined ? delete params.params.tag : undefined; 
        params.params.brand == undefined ? delete params.params.brand : undefined; 

        console.log("params", params);

        Product.getProducts(params).then(function(data) {
            if (data.results.length) {
                for(var i in data.results[0].hash_tags) {
                    if (data.results[0].hash_tags[i].id == tag) {
                        $scope.product_list.currentTag = data.results[0].hash_tags[i];
                        console.log("$scope.product_list.currentTag ", $scope.product_list.currentTag );
                    }
                }
                $scope.product_list.products = data.results;
            }
        })

        $scope.product_list.goHashTag = function(tag, $event) {
            $event.stopPropagation();
            $location.url('/main/hashtag/products?tag='+tag.id);
        }

        $scope.product_list.goProductDetail = function(product_id) {
            $location.url('/main/products/'+product_id);
        }

    })