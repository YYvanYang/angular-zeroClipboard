'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
  ,'jm.zeroclipboard'
   ,'jm.fullscreen'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');


  $routeProvider.otherwise({redirectTo: '/view1'});

  //$locationProvider.html5Mode(true);
}])
    .config(['jmZeroclipboardConfigProvider', function(jmZeroclipboardConfigProvider) {
      // config ZeroClipboard
      jmZeroclipboardConfigProvider.setZcConf({
        swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
      });
    }]);
