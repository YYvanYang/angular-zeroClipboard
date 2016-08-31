/**
 * Created by xld on 2016/8/25.
 */
'use strict';

angular.module('jm.infiniteScroll', [])
    .directive('jmInfiniteScroll', ['$interval','$timeout',function ($interval,$timeout) {
        return {
            restrict: 'EA',
            scope: {
                interval: "@",
                finish:"="
            },
            link: function(scope, element, attrs) {
                var ele = element[0];
                var $ele = angular.element(ele);
                var $box = $ele.parent();
                var box = ele.parentElement;
                var boxHeight = box.offsetHeight;
                var listHeight = ele.offsetHeight;

                var timer;
                var offset = 0;

                /**
                 *  fixed for ng-repeat.
                 *  call this function after finished repeat render the list items
                 *  the data should be copy one
                 */
                scope.$watch('finish', function (value) {
                    if (value) {
                        $timeout(function () {
                            boxHeight = box.offsetHeight;
                            listHeight = ele.offsetHeight;

                            run(listHeight, boxHeight);
                        })

                    }
                })

                run(listHeight, boxHeight);

                function run(listHeight, boxHeight) {
                    if (listHeight >= boxHeight) {
                        $ele.append($ele.html());
                        start();
                        $box.on("mouseover",stop).on("mouseout",start);
                    }
                }

                function start()
                {
                    // Don't start a new timer if it is already instantiated
                    if ( angular.isDefined(timer) ) return;

                    timer = $interval(function() {
                        box.scrollTop = offset;
                        offset === listHeight ? offset = 0 : offset++;
                    }, scope.interval);
                }

                function stop()
                {
                    if (angular.isDefined(timer)) {
                        $interval.cancel(timer);
                        timer = undefined;
                    }
                }

            }
        };
    }])