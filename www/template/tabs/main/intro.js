angular.module('radio.controller')

.controller('MainIntroCtrl', function($scope, $location, $state) {

    $scope.main_intro = {};


    $scope.main_intro.filter = '추천';

    $scope.main_intro.content = '이슈';

    /*
    $scope.main_intro.toggleFilter = function() {
        if ($scope.main_intro.filter == '추천') {
            $scope.main_intro.filter = '인기';
            $location.url('/hot/issues');
            //$location.url('/tabs/main/issues');
        } else {
            $scope.main_intro.filter = '추천';
            $location.url('/rec/issues');
            //$location.url('/tabs/main/products');
        }
    }
    */
})