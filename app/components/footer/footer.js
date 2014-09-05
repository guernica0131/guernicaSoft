(function() {

	'use strict';

	angular.module('gSoft.footer', ['ngRoute'])

	// .config(['$routeProvider', function($routeProvider) {
 //  	$routeProvider.when('/view1', {
 //    	templateUrl: 'views/view1/view1.html',
 //    	controller: 'View1Ctrl'
 //  	});
	// }])

	.directive('footBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/footer/footer.html'
		}
	})

	.controller('navbarCtrl', ["$scope" , function($scope) {
		//$scope.greeting = "HI Adam";
	}]);

})();