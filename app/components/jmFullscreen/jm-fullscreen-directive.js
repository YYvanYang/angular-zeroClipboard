/**
 * Created by xld on 2016/8/23.
 */
'use strict';

angular.module('jm.fullscreen', [])
    .directive('jmFullscreen', [function () {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                // 'open': '&onOpen',
                // 'close': '&onClose'
            },
            link: function(scope, element, attrs) {
                var ele = element[0];
                scope.open = open;
                scope.close = close;

                scope.isOpen = false;

                // show fullscreen
                function open() {
                    scope.isOpen = true;
                }

                // close fullscreen
                function close() {
                    scope.isOpen = false;
                }

            },
            templateUrl: 'components/jmFullscreen/jm-fullscreen.html'
        };
    }])