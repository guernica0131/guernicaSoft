 (function() {
 angular.module('gSoft.pPage', ['gSoft.Contact'])

    .directive('primaryPage', [function() {
        return {
            restrict: 'E',
            templateUrl: 'components/pages/primary/page.html',
            controller: function($scope) {
            },
            controllerAs: 'pPage',
            scope: true
        }
    }]);
})();