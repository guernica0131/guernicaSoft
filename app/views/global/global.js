(function() {

    'use strict';

    angular.module('gSoft.global', ['ngRoute', 'gSoft.scrollPage', 'gSoft.tiles'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/global', {
                templateUrl: 'partials/story.html',//'views/global/global.html',
                controller: 'GlobalCtrl'
            });
        }
    ])

    .controller('GlobalCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex", "Title",
        function($scope, $routeParams, $location, LoadPage, PortalIndex, Title) {

            Title.set("guernica Softwork's global footprint");

            $scope.portals = portals;
            var pIndex = new PortalIndex.i(portals);

            $scope.sprite = 'it';

            $scope.bgColor = 'night';
            // now we set the portal link into the scope
            pIndex.portalLoader($scope, $routeParams, $location, LoadPage);
       
        }
    ]);

    // change to a REST Call
    var portals = [

        {
            template: 'bold-list',
            row: {
                display: "header",
                pull: 'pull-left',
                image: {
                    cssClass: 'fixed-row-background',
                    src: 'kids',
                }

            },
            textRows: ['we are', 'guernica Softworks'],
            css: {
                parent: ['push-to-bottom'],
                row: ['white', 'text-massive'],
            },

        },

        {

            template: 'bold-list',
            row: {
                pull: 'pull-right',
                // image: {
                //     src: 'artisans'
                // }
            },
            // title: 'guernica Softworks',
            // lead: 'digital artisans',
            textRows: ['we', 'are', 'digital', 'artisans'],

            css: {
                row: ['white'],
            },
            portal: 'gSoft',
            cssClass: 'black'
        },

        {
            template: 'bold-list',
            textRows: ['and', 'we are', 'global'],
            row: {
                display: "page",
                pull: 'centered',
                image: {
                    cssClass: 'fixed-row-background',
                    src: 'driver',
                }

            },
            css: {
                row: ['white', 'text-massive'],
                text: {
                    header: 'night',
                    lead: 'contrast',
                    template: 'white',
                    p: 'night'
                },
                right: true
            },
            portal: 'custom',
            cssClass: 'white',
        },

           {

            template: 'bold-list',
            row: {
                pull: 'pull-left',
            },
            textRows: ['this', 'is' , 'our', 'story'],

            css: {
                row: ['white'],
            },
            portal: 'gSoft',
            cssClass: 'contrast'
        },

          {

            template: 'bold-list-tiles',
            row: {
                display: "tiles",
                pull: 'pull-right'
            },
            textRows: ['this', 'is' , 'our', 'passion'],

            css: {
                row: ['white'],
            },
            portal: 'gSoft',
            cssClass: 'night',
            tiles: [

                {

                    title: "Context",
                    story: "We deliver products that focus on the needs of communites that you intend to serve. Count on guernica Softworks to get the job done in a contextually sensitive format",
                    color: 'red',
                    teaser: "How do we opperate?",
                    tcolor: 'white',
                    id: 'tile0'

                },

                {

                    title: "Location",
                    story: "We have offices in Washington, DC and Islamabad, Pakistan. However, we can be deploy anywhere you need us. Our work spans the USA, Pakistan, Kenya, Rwanda, Uganda, Ethopia, Cambodia, Thailand, and more. We are truely international.",
                    color: 'blue',
                    teaser: "Where's gSoft?",
                    tcolor: 'white',
                    id: 'tile1'

                },

                {

                    title: "Lineup",
                    story: "We focus on enterprise-class web applications, applications that are custom designed to meet your project's need. Whether it is a system for collecting participant data or a solution for conducting field surveys, we can do it and do it specifacally for you",
                    color: 'base',
                    teaser: "Want to find the perfect solution?",
                    tcolor: 'white',
                    id: 'tile2'

                },


                {

                    title: "Process",
                    story: "You're technological needs cannot be solved without a comprehesive understanding of both your project's requirements and a clear evaluation of context in which you plan to deploy. Our production specialists work to thoroughly uncover the unique technological requirements that your team needs to get the job done. In short, we strive to understand, you.",
                    color: 'rust',
                    teaser: "How do we do it?",
                    tcolor: 'white',
                    id: 'tile3'

                },

                {

                    title: "Commitment",
                    story: "Our production team is dedicated to provide world-class standards for your IT needs. As a client, you'll work with a producer who is focused on bringing your vision to realiity. We show fast and show often and YOU will become a crucial part of the development of your IT solution.",
                    color: 'gold',
                    teaser: "What do you get?",
                    tcolor: 'white',
                    id: 'tile4'

                },

                {

                    title: "Robust",
                    story: "Our solutions are designed to the highest enteprise standards. All of our products are back-by a functional gaurantee. In other words, what we say we can deliver, we deliver.",
                    color: 'gray',
                    teaser: "What's our gaurantee?",
                    tcolor: 'white',
                    id: 'tile5'

                },

                  {

                    title: "Production",
                    story: "Availability and durability of an IT solution is a measures success for any project. Production systems must work and work as intended. Before any system goes live it is throughly tested in production-mocked envirnments. Whether you expect ten users or ten-thousand, we're committed to ensuring that your solution is always on and always ready.",
                    color: 'contrast',
                    teaser: "How we measure success?",
                    tcolor: 'white',
                    id: 'tile6',
                    

                },

                   {

                    title: "Mobile",
                    story: "The reign of the desktop is over. It is a mobile world and we are committed to delivering solutions that align to this paradigm. Our APIs (Application Protocol Interface) are perfectly suited for both mobile and SMS integration. Whether your users connect via the advanced 4G networks of South Korea or they opperate in rural Ethiopia in SMS only regions, we have the right solution.",
                    color: 'black',
                    teaser: "Why it's important?",
                    tcolor: 'white',
                    id: 'tile7'

                },


            ]

        },

         {

            template: 'bold-list-finale',
            row: {
                pull: 'pull-left'
            },
            textRows: ['want', 'to' , 'learn', 'more?'],

            css: {
                row: ['white'],
            },
            conclude: "If you are interest in guernica Softworks global, please send us your information by clicking the 'Tell us more!' button. Also, share us on Facebook, twitter, or google plus.",
            closer:'<br/><br/><br/><br/><br/><h4>Original photography by gSoft contributer, Meredith McCormac. Visit her full <a href="#/gallery">gallery</a></h4>',
            portal: 'gSoft',
            cssClass: 'base'
        },

     
      
    ];



})();