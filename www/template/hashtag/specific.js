angular.module('radio.controller')

	.controller('HashTagSpecificCtrl', function(Channel, $scope, $location) {

        $scope.tag_specific = {};

        console.log("Specific Ctrl!");

        var tag = $location.search().tag;
 		
        if ($location.search().brand == undefined) {
        	url = '/main/hashtag/issues?tag=' + tag;
        } else if ($location.search().channel == undefined)  {
        	url = '/main/hashtag/products?tag=' + tag;
        }

 		/*
        if ($location.search().brand == undefined) {
        	query_string = '?tag=' + tag + '&channel=' + $location.search().channel;
        	url = '/main/hashtag/issues' + query_string;
        } else if ($location.search().channel == undefined)  {
        	query_string = '?tag=' + tag + '&brand=' + $location.search().brand;
        	url = '/main/hashtag/products' + query_string;
        }
        */

        $scope.tag_specific.goHashTagGlobal = function() {
        	$location.url(url);
        }

})