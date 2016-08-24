/**
 * Created by xld on 2016/8/24.
 */

'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', 'Fullscreen', function($scope, Fullscreen) {

        // Get the modal
        var modal = document.getElementById('myModal');
        var $modal = angular.element(modal);

        // Initially, do not go into full screen
        $scope.isFullscreen = false;

        $scope.toggleFullScreen = function() {
            $scope.isFullscreen = !$scope.isFullscreen;
        }

        // When the user clicks on the button, open the modal
        $scope.open = function () {
            $modal.css('display', 'block');
        }

        // When the user clicks on <span> (x), close the modal
        $scope.close = function () {
            $modal.css('display', 'none');
            $scope.isFullscreen = false;
        }

        // When the user clicks anywhere outside of the modal, close it
        $scope.closeBybackdrop = function (event) {
            if (event.target == modal) {
                $modal.css('display', 'none');
                $scope.isFullscreen = false;
            }
        }

    }]);

