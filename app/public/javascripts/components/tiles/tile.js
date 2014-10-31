(function() {

    'use strict';

    angular.module('gSoft.tiles', ['angular-inview'])


    .directive('tiles', ['ImageLocation',  "Intercom", "LoadPage" ,function(ImageLocation,  Intercom, LoadPage) {
        return {
            restrict: 'E',
            templateUrl: 'components/tiles/tile.html',
            controller: ["$scope", function($scope) {   

                $scope.viewSwitch = {};

                $scope.closeTile = function(id) {
                    $scope.renderText = false;
                    $scope.viewSwitch[id] = false;
                };

                $scope.revealTile = function(id) {

 
                    $scope.renderText = false;
                    var rendered = !$scope.viewSwitch[id];


                    $scope.viewSwitch[id] = rendered;
                    
                    if (rendered)
                    LoadPage.timeout(600).then(function() {
                        $scope.renderText = true;
                    });
                };

                $scope.teaseTile = function(id) {
                    if (!$scope.sprite)
                        return;
                    var listNumber = parseInt(id.match(/\d/)[0]),
                    offset = -150 * listNumber,
                    url = ImageLocation.retrieve({name: $scope.sprite , request: 'CUT'}),
                    fullUrl = 'url(' + url + ') ' + offset + "px 0";

                    return fullUrl;
                };


                $scope.spreadTiles = function() {

                    if ($scope.triggered || $scope.spread)
                        return;

                    $scope.triggered = true;
                    LoadPage.timeout(1000).then(function() {
                        $scope.spread = true;
                    });

                };

              
            }],
            link: function(scope, element, attrs) {},
            controllerAs: 'TileCtrl',
            scope: {
                tiles: "=",
                sprite: "="
            }

        }
    }]);

})();