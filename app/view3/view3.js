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

        $scope.goFullscreen = function () {
            var c = document.getElementById('my-modal-content');
            var $c = angular.element(c);
            if (Fullscreen.isSupported()) {
                if (Fullscreen.isEnabled())
                {
                    Fullscreen.cancel();
                    $c.removeClass('fullscreen')
                }
                else {
                    Fullscreen.enable( document.getElementById('myModal') )
                    $c.addClass('fullscreen')
                }
            } else {
                if ($c.hasClass('fullscreen')) {
                    $c.removeClass('fullscreen')
                }else {
                    $c.addClass('fullscreen')
                }

            }



            // Set Fullscreen to a specific element (bad practice)
            // Fullscreen.enable( document.getElementById('myModal') )



        }


// Get the modal
        var modal = document.getElementById('myModal');

// Get the button that opens the modal
        var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
        var span = document.getElementById("close");

// When the user clicks on the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
        }

// When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

// When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }]);

