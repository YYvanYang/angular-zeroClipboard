# angular-clipboard — Demo

### example

```

// app.js
 .config(['jmZeroclipboardConfigProvider', function(jmZeroclipboardConfigProvider) {
      // config ZeroClipboard
      jmZeroclipboardConfigProvider.setZcConf({
        swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
      });
    }]);

```

```
// view1.js
'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


.controller('View1Ctrl', ['$scope',function($scope) {
  $scope.complete = function(e) {
    console.log('copy complete', e);
    $scope.copied = true
  };
  $scope.$watch('input', function(v) {
    $scope.copied = false
  });
  $scope.clipError = function(e) {
    console.log('Error: ' + e.name + ' - ' + e.message);
  };
}]);
```

```
<!--view1.html-->
<div>
    <h1>Copy from input</h1>
    <label for="">input: <input type="text" ng-model="input" id="input1"></label>
    <button jm-zeroclipboard zeroclip-copied="complete($event)" zeroclip-on-error="clipError($event)" zeroclip-model="input" >Copy</button>
    <span ng-show="copied">Copied!</span>
</div>

<div>
    <h1>Copy interpolated text</h1>
    <span>This will copy: "This input text: {{ input }}"</span>
    <button jm-zeroclipboard zeroclip-copied="copiedText=true" zeroclip-text="This input text: {{ input }}" >Copy</button>
    <span ng-show="copiedText">Copied!</span>
</div>
```
