 angular.module('gSoft.simplePage', [])

 .directive('simplePage', function() {
     return {
         restrict: 'E',
         templateUrl: 'components/pages/simple/simple.html',
         controller: function($scope) {
            
         },
         controllerAs: 'SimplePage',
         scope: true
         ///  location: true
     }
 });