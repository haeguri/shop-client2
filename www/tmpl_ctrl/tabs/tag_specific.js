angular.module('radio.controller')

	.controller('TagSpecificCtrl', function(Channel, Product, $scope, $location, 
        $state, $stateParams) {

        $scope.tag_specific = {};

        $scope.tag_specific.currentTag = $stateParams.tag;
        $scope.tag_specific.currentTagName = '';
        $scope.tag_specific.currentOwner = $stateParams.owner;
        $scope.tag_specific.currentOwnerId = $stateParams.owner_id;

        url_pattern = /main|channel|private|search/.exec($state.current.name)[0];

        function setCurrentTagName(result_tags) {
            console.log("result_tags", result_tags)
            for(var i in result_tags) {
                if (result_tags[i].id == $scope.tag_specific.currentTag) {
                    $scope.tag_specific.currentTagName = result_tags[i].name;
                    break;
                }
            }
        }
        
        if($scope.tag_specific.currentOwner == 'brand') {
            Product.getProducts({
                'params': {
                    'page':1,
                    'tag':$scope.tag_specific.currentTag,
                    'brand':$scope.tag_specific.currentOwnerId
                }
            }).then(function(data) {
                $scope.tag_specific.products = data.results;
                setCurrentTagName(data.results[0].hash_tags)
            });

            $scope.tag_specific.goTagSpecific = function($event, tag_id, owner_id) {
                switch(url_pattern) {
                    case 'main':
                        $state.go('tabs.main_tag_specific', {'tag':tag_id, 'owner':'brand', 'owner_id':owner_id});
                        break; 
                    case 'channel':
                        $state.go('tabs.channel_tag_specific', {'tag':tag_id, 'owner':'brand', 'owner_id':owner_id});
                        break;
                    case 'private':
                        $state.go('tabs.private_tag_specific', {'tag':tag_id, 'owner':'brand', 'owner_id':owner_id});
                        break;
                    case 'search':
                        $state.go('tabs.search_tag_specific', {'tag':tag_id, 'owner':'brand', 'owner_id':owner_id});
                        break;
                }

            }

            $scope.tag_specific.goTagGlobal = function() {
                var tag_id = $scope.tag_specific.currentTag;

                switch(url_pattern) {
                    case 'main':
                        $state.go('tabs.main_tag_global', {'tag':tag_id, view:'products'});
                        break; 
                    case 'channel':
                        $state.go('tabs.channel_tag_global', {'tag':tag_id, view:'products'});
                        break;
                    case 'private':
                        $state.go('tabs.private_tag_global', {'tag':tag_id, view:'products'});
                        break;
                    case 'search':
                        $state.go('tabs.search_tag_global', {'tag':tag_id, view:'products'});
                        break;
                }

            }

            $scope.tag_specific.goProductDetail = function(product_id) {
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
        
        } else if($scope.tag_specific.currentOwner == 'channel') {
            Channel.getIssues({
                'params': {
                    'page':1,
                    'tag':$scope.tag_specific.currentTag,
                    'channel':$scope.tag_specific.currentOwnerId
                }
            }).then(function(data) {
                $scope.tag_specific.issues = data.results;
                setCurrentTagName(data.results[0].hash_tags)
            })

            $scope.tag_specific.goTagSpecific = function($event, tag_id, owner_id) {
                $event.stopPropagation();
                switch(url_pattern) {
                    case 'main':
                        $state.go('tabs.main_tag_specific',  {'tag':tag_id, 'owner':'channel', 'owner_id':owner_id});
                        break; 
                    case 'channel':
                        $state.go('tabs.channel_tag_specific',  {'tag':tag_id, 'owner':'channel', 'owner_id':owner_id});
                        break;
                    case 'private':
                        $state.go('tabs.private_tag_specific',  {'tag':tag_id, 'owner':'channel', 'owner_id':owner_id});
                        break;
                    case 'search':
                        $state.go('tabs.search_tag_specific',  {'tag':tag_id, 'owner':'channel', 'owner_id':owner_id});
                        break;
                }
            }

            $scope.tag_specific.goTagGlobal = function() {
                var tag_id = $scope.tag_specific.currentTag;

                switch(url_pattern) {
                    case 'main':
                        $state.go('tabs.main_tag_global',  {'tag':tag_id, view:'issues'});
                        break; 
                    case 'channel':
                        $state.go('tabs.channel_tag_global',  {'tag':tag_id, view:'issues'});
                        break;
                    case 'private':
                        $state.go('tabs.private_tag_global',  {'tag':tag_id, view:'issues'});
                        break;
                    case 'search':
                        $state.go('tabs.search_tag_global',  {'tag':tag_id, view:'issues'});
                        break;
                }

            }

            $scope.tag_specific.goIssueDetail = function(issue_id) {
                switch(url_pattern) {
                    case 'main':
                        $state.go('tabs.main_issue_detail', {'issue_id':issue_id});
                        break; 
                    case 'channel':
                        $state.go('tabs.channel_issue_detail', {'issue_id':issue_id});
                        break;
                    case 'private':
                        $state.go('tabs.private_issue_detail', {'issue_id':issue_id});
                        break;
                    case 'search':
                        $state.go('tabs.search_issue_detail', {'issue_id':issue_id});
                        break;
                }
            }
        }

    });