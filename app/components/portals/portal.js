(function() {
    angular.module('gSoft.portal', [])

    .directive('portals', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/portals/portal.html',
            controller: function($scope, $location) {
                // this gives our portal template access to the ImageLocation object
                //$scope.images = ImageLocation.retrieve;

            },
            controllerAs: 'Portal',
            scope: true
        }
    });

})();