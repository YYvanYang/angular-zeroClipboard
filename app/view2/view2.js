'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope',function($scope) {
    $scope.finish = false;

    $scope.finished = function (last) {
        $scope.finish = last;
    }

    var data = [
        ['a0','b',1,2,3,4,5,6,7,8,9,10],
        ['a1','b',1,2,3,4,5,6,7,8,9,10],
        ['a2','b',1,2,3,4,5,6,7,8,9,10],
        ['a3','b',1,2,3,4,5,6,7,8,9,10],
        ['a4','b',1,2,3,4,5,6,7,8,9,10],
        ['a5','b',1,2,3,4,5,6,7,8,9,10],
        ['a6','b',1,2,3,4,5,6,7,8,9,10],
        ['a7','b',1,2,3,4,5,6,7,8,9,10],
        ['a8','b',1,2,3,4,5,6,7,8,9,10],
        ['a9','b',1,2,3,4,5,6,7,8,9,10],
        ['a10','b',1,2,3,4,5,6,7,8,9,10],
        ['a11','b',1,2,3,4,5,6,7,8,9,10]
    ]

    $scope.listData = data;




}]);