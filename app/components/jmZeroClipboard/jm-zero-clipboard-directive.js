/**
 * Created by xld on 2016/8/22.
 */
'use strict';

angular.module('jm.zeroclipboard', [])
    .provider('jmZeroclipboardConfig', function () {
        var _globalConfig = {

            // SWF URL, relative to the page. Default value will be "ZeroClipboard.swf"
            // under the same path as the ZeroClipboard JS file.
            swfPath: "ZeroClipboard.swf",

            // SWF inbound scripting policy: page domains that the SWF should trust.
            // (single string, or array of strings)
            trustedDomains: window.location.host ? [window.location.host] : [],

            // Include a "noCache" query parameter on requests for the SWF.
            cacheBust: true,

            // Enable use of the fancy "Desktop" clipboard, even on Linux where it is
            // known to suck.
            forceEnhancedClipboard: false,

            // How many milliseconds to wait for the Flash SWF to load and respond before assuming that
            // Flash is deactivated (e.g. click-to-play) in the user's browser. If you don't care about
            // how long it takes to load the SWF, you can set this to `null`.
            flashLoadTimeout: 30000,

            // Setting this to `false` would allow users to handle calling `ZeroClipboard.focus(...);`
            // themselves instead of relying on our per-element `mouseover` handler.
            autoActivate: true,

            // Bubble synthetic events in JavaScript after they are received by the Flash object.
            bubbleEvents: true,

            // Ensure OS-compliant line endings, i.e. "\r\n" on Windows, "\n" elsewhere
            fixLineEndings: true,

            // Sets the ID of the `div` encapsulating the Flash object.
            // Value is validated against the [HTML4 spec for `ID` tokens][valid_ids].
            containerId: "global-zeroclipboard-html-bridge",

            // Sets the class of the `div` encapsulating the Flash object.
            containerClass: "global-zeroclipboard-container",

            // Sets the ID and name of the Flash `object` element.
            // Value is validated against the [HTML4 spec for `ID` and `Name` tokens][valid_ids].
            swfObjectId: "global-zeroclipboard-flash-bridge",

            // The class used to indicate that a clipped element is being hovered over.
            hoverClass: "zeroclipboard-is-hover",

            // The class used to indicate that a clipped element is active (is being clicked).
            activeClass: "zeroclipboard-is-active",



            // Forcibly set the hand cursor ("pointer") for all clipped elements.
            // IMPORTANT: This configuration value CAN be modified while a SWF is actively embedded.
            forceHandCursor: false,

            // Sets the title of the `div` encapsulating the Flash object.
            // IMPORTANT: This configuration value CAN be modified while a SWF is actively embedded.
            title: null,

            // The z-index used by the Flash object.
            // Max value (32-bit): 2147483647.
            // IMPORTANT: This configuration value CAN be modified while a SWF is actively embedded.
            zIndex: 999999999

        };

        var _overrideConfig = true;

        this.setZcConf = function(zcConf) {
            angular.extend(_globalConfig, zcConf);
        };
        this.setOverrideConfig = function(overrideConfig) {
            _overrideConfig = overrideConfig;
        }
        this.$get = function() {
            return {
                zeroclipConfig: _globalConfig,
                overrideConfig: _overrideConfig
            };
        };
    })

    .directive('jmZeroclipboard', ['$window', 'jmZeroclipboardConfig', function($window, jmZeroclipboardConfig) {

        var zeroclipConfig = jmZeroclipboardConfig.zeroclipConfig || {};
        var ZeroClipboard = $window.ZeroClipboard;

        //ZeroClipboard.config( { swfPath: "bower_components/zeroclipboard/dist/ZeroClipboard.swf" } );

        return {
            scope: {
                onCopied: '&zeroclipCopied',
                onError: '&?zeroclipOnError',
                onBeforeCopy: '&?zeroclipOnBeforeCopy',
                client: '=?jmZeroclipboard',
                value: '=zeroclipModel',
                text: '@zeroclipText'
            },
            link: function(scope, element, attrs) {

                var btn = element[0];
                var _completeHnd;

                // config
                if(jmZeroclipboardConfig.overrideConfig) {
                    ZeroClipboard.config(zeroclipConfig);
                }

                if (angular.isFunction(ZeroClipboard)) {
                    scope.client = new ZeroClipboard(btn);
                }

                scope.$watch('value', function(v) {
                    if (v === undefined) {
                        return;
                    }
                    element.attr('data-clipboard-text', v);
                });

                scope.$watch('text', function(v) {
                    element.attr('data-clipboard-text', v);
                });

                scope.client.on('aftercopy', _completeHnd = function(e) {
                    scope.$apply(function() {
                        scope.onCopied({$event: e});
                    });
                });

                scope.client.on('error', function(e) {
                    if (scope.onError) {
                        scope.$apply(function() {
                            scope.onError({$event: e});
                        });
                    }
                    ZeroClipboard.destroy();
                });

                scope.client.on('beforecopy', function (e) {
                    if (scope.onBeforeCopy) {
                        scope.$apply(function () {
                            scope.onBeforeCopy({ $event: e });
                        });
                    }
                });

                scope.$on('$destroy', function() {
                    scope.client.destroy();
                    scope.client = null;
                    element.off();
                });
            }
        };
    }]);