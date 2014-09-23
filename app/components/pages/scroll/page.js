 angular.module('gSoft.scrollPage', ['gSoft.Contact'])

 .directive('scrollPage', function() {
     return {
         restrict: 'E',
         templateUrl: 'components/pages/scroll/page.html',
         controller: function($scope, $location, ImageLocation) {
             $scope.images = ImageLocation.retrieve;
         },
         controllerAs: 'scrollPage',
         scope: true
         ///  location: true
     }
 });