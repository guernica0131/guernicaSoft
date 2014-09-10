 angular.module('gSoft.pPage', [])

/*     .config(['$routeProvider', function($routeProvider) {
      	$routeProvider.when('/view1', {
        templateUrl: 'views/view1/view1.html',
       	controller: 'pPage'
      	});
     }])
*/
    .directive('primaryPage', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/pages/primary/page.html',
            controller: function($scope, $location) {
            	console.log("This is the page element");
            },
            controllerAs: 'pPage',
            scope: true
          ///  location: true
        }
    });