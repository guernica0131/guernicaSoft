(function() {

'use strict';

angular.module('gSoft.global', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/global', {
    templateUrl: 'views/global/global.html',
    controller: 'GlobalCtrl'
  });
}])

.controller('GlobalCtrl', [function() {

}]);


})();