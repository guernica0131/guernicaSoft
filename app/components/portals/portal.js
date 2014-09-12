 
 angular.module('gSoft.portal', [])

    // .config(['$routeProvider', function($routeProvider) {
    //  	$routeProvider.when('/view1', {
    //    	templateUrl: 'views/view1/view1.html',
    //    	controller: 'View1Ctrl'
    //  	});
    // }])

    .directive('portals', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/portals/portal.html',
            controller: function($scope, $location, ImageLocation ) {
            	//console.log("This is the portal element", ImageLocation.retrieve('THUMBS', 'global') );
                


                    


                $scope.images = ImageLocation.retrieve;
                
                // function() {
                //     console.log("Getting pulled");
                //     return {
                //         pull : ImageLocation.retrieve
                //     }
                //     //return "get MEEERERE;";
                // }'


                //$scoImageLocation.retrieve()



            },
            controllerAs: 'Portal',
            scope: true
          ///  location: true
        }
    });