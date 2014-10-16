(function() {

    'use strict';

    angular.module('gSoft.global', ['ngRoute', 'gSoft.scrollPage', 'gSoft.tiles'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/global', {
                templateUrl: 'views/global/global.html',
                controller: 'GlobalCtrl'
            });
        }
    ])

    .controller('GlobalCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex",
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

                    title: "What we do?",
                    story: "We deliver products that focuses on the needs of communites you intend to serve. Count on guernica Softworks to get the job done in a contextually sensitive format",
                    color: 'red',
                    teaser: "Click to read more...",
                    id: 'tile0'

                },

                {

                    title: "Where are we?",
                    story: "We have offices in Washington, DC and Islamabad, Pakistan. However, we can be deploy anywhere you need us. We've had work in the USA, Pakistan, Kenya, Rwanda, Uganda, Ethopia, Cambodia, Thailand, and more. We are truely international.",
                    color: 'blue',
                    teaser: "Click to find were's gSoft",
                    id: 'tile1'

                },

                {

                    title: "What's in our global lineup?",
                    story: "We focus on enterprise-class web applications, applications that are custom designed to meet your project's need. Whether it is a system for collecting participant data or a system for conducting field surveys, we can do it for you",
                    color: 'base',
                    teaser: "Uncover the perfect solution",
                    id: 'tile2'

                },


                {

                    title: "What we do?",
                    story: "Curabitur blandit mollis lacus. Duis leo. Nunc nulla. Fusce neque.. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Phasellus a est. Phasellus consectetuer vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.",
                    color: 'rust',
                    teaser: "Click to read more...",
                    id: 'tile3'

                },

                {

                    title: "What we do?",
                    story: "Curabitur blandit mollis lacus. Duis leo. Nunc nulla. Fusce neque.. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Phasellus a est. Phasellus consectetuer vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.",
                    color: 'gold',
                    teaser: "Click to read more...",
                    id: 'tile4'

                },

                {

                    title: "What we do?",
                    story: "Curabitur blandit mollis lacus. Duis leo. Nunc nulla. Fusce neque.. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Phasellus a est. Phasellus consectetuer vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.",
                    color: 'gray',
                    teaser: "Click to read more...",
                    id: 'tile5'

                },

                  {

                    title: "What we do?",
                    story: "Curabitur blandit mollis lacus. Duis leo. Nunc nulla. Fusce neque.. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Phasellus a est. Phasellus consectetuer vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.",
                    color: 'contrast',
                    teaser: "Click to read more...",
                    id: 'tile6',
                    

                },

                   {

                    title: "What we do?",
                    story: "Curabitur blandit mollis lacus. Duis leo. Nunc nulla. Fusce neque.. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Phasellus a est. Phasellus consectetuer vestibulum elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.",
                    color: 'black',
                    teaser: "Click to read more...",
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