(function() {

    'use strict';

    angular.module('gSoft.about', ['angular-inview', 'gSoft.scrollPage'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/about', {
                templateUrl: 'partials/story.html',//'views/about/about.html',
                controller: 'AboutCtrl'
            });
        }
    ])

    .controller('AboutCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex", "Title",
        function($scope, $routeParams, $location, LoadPage, PortalIndex, Title) {
             
            Title.set("About guernica Softworks");

            $scope.portals = portals;
            var pIndex = new PortalIndex.i(portals);

            //$scope.sprite = 'rustic';
            // now we set the portal link into the scope
            pIndex.portalLoader($scope, $routeParams, $location, LoadPage);
       
        console.log($scope.activePortal);
        }
    ]);

    // change to a REST Call
    var portals = [

        {
        portal: 'about',
        rows: [
          {
          //  id: 'row0',
            template: 'pad-70',
             row: {
                display: 'constrict'
            }
        },


        {
            id: 'row0',
            template: 'classy-row',
            title: 'Artfully Constructred',
            description: "At guernica Softworks, we believe that design and functionality are insperable to the contruction of quality software, quailities that should never be an implementation after thought, but rather, integral partners to other computational considerations. We believe, with absolute conviction, that the construction of software should be treated as a form of Art.",
            image: 'artisans',
            

        },

         {
            id: 'row1',
            template: 'classy-row',
            title: 'Open foundations',
            description: "We are experts in a range of rubust open-source solutions that provide proven, production-class reliablity and performance. We are constantly adopting the most cutting edge technologies, technologies aimed to augment functionality and user experience. However, we never sacrifice reliablity for trends. That's why we only bring to production mature, community supported technologies.",
            image: 'open',
            pin: true

            

        },

         {
            id: 'row2',
            template: 'classy-row',
            title: 'Engineered to perfection',
            description: "We recruit only top engineers and developers, talent that is not only technologically savvey but also demonstrates the executive maturity to understand why only the strictest engineering practices are acceptable. They understand that because of you, their client, they have an unwaivering commitment to deliver only their best.",
            image: 'code',
            pin: true

        },


         {
            id: 'row3',
            template: 'classy-row',
            title: 'Designed for Impact',
            description: "The finished product is not only a tool, but an experience, one that should extend the technological requirements and connect humanistically with its users. Our design philosophy begins with the experience and seeks to discover how technology can be leverage to provide optimal impact.",
            image: 'impact',
            

        },

       
        ]
        

     }
      
    ];



})();