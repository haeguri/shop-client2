angular.module('radio.controller')

	.controller('MainCtrl', function(Channel, $scope, $location) {

        $scope.main = {};

        Channel.getCodies().then(function(data) {
            $scope.main.codies = data;
        });

        $scope.main.items = [];

        for (var i; i < 50; i++ ) {
            $scope.main.items.push(i);
        }

        $scope.main.openNotify = function() {
            $location.url('/tabs/main/notify');
        }

        $scope.main.openSearch = function() {
            $location.url('/tabs/main/notify');
        }
})
    .directive('resettingImg', function() {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {

          var currentElement = element;
          attr.$observe('src', function(src) {
            var newImg = element.clone(true);
            newImg.attr('src', src);
            currentElement.replaceWith(newImg);
            currentElement = newImg;
          });

        }
      };
});