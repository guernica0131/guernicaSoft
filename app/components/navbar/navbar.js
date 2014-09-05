(function() {

	'use strict';

	angular.module('gSoft.navbar', [])

	// .config(['$routeProvider', function($routeProvider) {
 //  	$routeProvider.when('/view1', {
 //    	templateUrl: 'views/view1/view1.html',
 //    	controller: 'View1Ctrl'
 //  	});
	// }])

	.directive('navBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/navbar/navbar.html'
		}
	})

	.controller('navbarCtrl', ["$scope" , function($scope) {
		//$scope.greeting = "HI Adam";
	}]);

})();