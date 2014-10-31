 (function() {

 angular.module('gSoft.scrollPage', ['gSoft.Contact'])

 .directive('scrollPage', [function() {
     return {
         restrict: 'E',
         templateUrl: 'components/pages/scroll/page.html',
         controller:["$scope", "ImageLocation", "LoadPage", function($scope, ImageLocation, LoadPage) {
             $scope.impress = {};
             $scope.fadein = function(e, id) {

                 if (!$scope.impress[id])
                     LoadPage.timeout(300).then(function() {
                         $scope.impress[id] = true;
                     });

             }

         }],
         controllerAs: 'scrollPage',
         scope: true
         ///  location: true
     }
 }]);

})();