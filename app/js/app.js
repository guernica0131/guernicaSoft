'use strict';

// Declare app level module which depends on views, and components
angular.module('gSoft', [
  'gSoftAnimations',
  'ngRoute',
  'gSoft.view1',
  'gSoft.view2',
  'gSoft.navbar',
  'gSoft.footer',
  'gSoft.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.factory('LoadPage', function($q, $timeout) {

  var timeout = function(time) {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve(['Hello', 'world!']);
    }, time || 0);

    return deferred.promise;
  };

  return {
    timeout: timeout
  };

})

.controller('gSoftCtrl', ["$scope", 'LoadPage' , function($scope, LoadPage) {
		//$scope.greeting = "HI Adam";	
		LoadPage.timeout(2000).then(function() {
		//console.log("I promise", control);
			$scope.drawCurtains = true;
			LoadPage.timeout(1000).then(function() {
				//console.log("Opening window");
				$scope.windowOpened = true;
			});
			///	control.windowOpened();
			//gSoftAnimations.drawCurtains();
		});
}])
.controller('windowCtrl', ["$scope", 'LoadPage' , function($scope, LoadPage) {
		
		// this.windowOpened = function() {
		// 	console.log("Hey");
		// }


}]);



