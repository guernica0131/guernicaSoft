//ContactCtl

(function() {
    'use strict';


    angular.module('gSoft.ImageFilter', [])


    .directive('imageFilter', function() {
        return {
            restrict: 'A',
            controller: function($scope, $window) {

                function($scope, $window, $routeParams, LoadPage, PortalIndex) {
                    $(window).resize(function() {
                        var win = this;
                        $scope.$apply(function() {});
                    })

                }




            },

            controllerAs: 'ImageFilterCtl',
            scope: true
            ///  location: true
        }
    });

})()