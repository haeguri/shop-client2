angular.module('radio.directive', [])
.directive('tab-button', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            console.log("element", element)
        }
    }
})
