angular.module('radio.controller')

	.controller('ProductListCtrl', function(Product, $scope, $state, $location) {

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
        var url_pattern = '';

        params.params.tag == undefined ? delete params.params.tag : undefined; 
        params.params.brand == undefined ? delete params.params.brand : undefined; 

        console.log("params", params);

        Product.getProducts(params).then(function(data) {
            if (data.results.length) {
                for(var i in data.results[0].hash_tags) {
                    if (data.results[0].hash_tags[i].id == tag) {
                        $scope.product_list.currentTag = data.results[0].hash_tags[i];
                        //console.log("$scope.product_list.currentTag ", $scope.product_list.currentTag );
                    }
                }
                $scope.product_list.products = data.results;
            }
        })

        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        $scope.product_list.goProductDetail = function(product_id) {
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_product_detail', {'product_id':product_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_product_detail', {'product_id':product_id});
                    break;
                case 'private':
                    $state.go('tabs.private_product_detail', {'product_id':product_id});
                    break;
                case 'search':
                    $state.go('tabs.search_product_detail', {'product_id':product_id});
                    break;
            }
        }

        $scope.product_list.goTagGlobalProducts = function(tag_id, $event) {
            $event.stopPropagation();
            switch(url_pattern) {
                case 'main':
                    $state.go('tabs.main_tag_global.products', {'tag':tag_id});
                    break; 
                case 'channel':
                    $state.go('tabs.channel_tag_global.products', {'tag':tag_id});
                    break;
                case 'private':
                    $state.go('tabs.private_tag_global.products', {'tag':tag_id});
                    break;
                case 'search':
                    $state.go('tabs.search_tag_global.products', {'tag':tag_id});
                    break;
            }
        }

    })