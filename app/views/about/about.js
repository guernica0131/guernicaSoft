(function() {

    'use strict';

    angular.module('gSoft.about', ['angular-inview', 'gSoft.scrollPage'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/about', {
                templateUrl: 'views/about/about.html',
                controller: 'AboutCtrl'
            });
        }
    ])

    .controller('AboutCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex",
        function($scope, $routeParams, $location, LoadPage, PortalIndex) {
             

            $scope.portals = portals;
            var pIndex = new PortalIndex.i(portals);

            //$scope.sprite = 'rustic';
            // now we set the portal link into the scope
            pIndex.portalLoader($scope, $routeParams, $location, LoadPage);
       
        }
    ]);

    // change to a REST Call
    var portals = [

        {
            id: 'row0',
            template: 'classy-row',
            title: 'Artfully Constructred',
            description: 'Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing. Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.',
            image: 'artisans',
            

        },

         {
            id: 'row1',
            template: 'classy-row',
            title: 'Open foundations',
            description: 'Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing. Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.',
            image: 'open',
            pin: true

            

        },

         {
            id: 'row2',
            template: 'classy-row',
            title: 'Engineered to perfection',
            description: 'Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing. Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.',
            image: 'code',
            pin: true

        },


         {
            id: 'row3',
            template: 'classy-row',
            title: 'Designed for Impact',
            description: 'Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing. Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.Vestibulum dapibus nunc ac augue. Nullam dictum felis eu pede mollis pretium. Nam adipiscing.',
            image: 'impact',
            

        },

       

        

     
      
    ];



})();