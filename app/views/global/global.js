(function() {

    'use strict';

    angular.module('gSoft.global', ['ngRoute', 'gSoft.scrollPage'])

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
            // now we set the portal link into the scope
            pIndex.portalLoader($scope, $routeParams, $location, LoadPage);

            $scope.head = {
                template: 'bold-list',
                texts: ['we are', 'guernica Softworks'],
                text: {
                    content: "We a globaly focus independent digital creative studio",
                    tag: "We are guernica Softworks",
                    color: {
                        content: "rust",
                        tag: "white"
                    }
                },
                //jumbotron: 'noise',
                image: 'kids'
                // curtain: 'noise'
            }

            //$scope.headerImage = "global";


        }
    ]);

    // change to a REST Call
    var portals = [

        {
            
            template: 'bold-list',
            row: {
                pull: 'pull-right'
            },
            // title: 'guernica Softworks',
            // lead: 'digital artisans',
            texts: ['we', 'are' , 'digital', 'artisans'],

            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },

            content: {

                thumbnail: {
                    src: 'logo',
                    alt: 'guernica Softworks Logo'
                },
                body: {
                    //  src: 'global',
                    alt: "Na Na"
                }
            },
            css: {
                row: ['white'],
                text: {
                    header: 'night',
                    lead: 'base',
                    p: 'night',
                    template: 'white',
                    classs: ['']
                }
            },
            order: 1,
            portal: 'gSoft',
            cssClass: 'black'
        },

        {
            template: 'bold-list',
            texts: ['we are' , 'Global'],
            row: {
                display: "page",
                pull: 'centered'

            },
            content: {
                body: {
                    cssClass: 'fixed-row-background',
                    src: 'driver',
                    alt: "Na Na"
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
            video: true,
            order: 1,
            portal: 'custom',
            cssClass: 'white',
        },

        {
            title: 'ICT Consulting',
            lead: 'your personal tech gurus',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {

                thumbnail: {
                    src: 'consulting',
                    alt: 'Consulting Services'
                },
                body: {
                    //     src: 'consulting'
                }
            },
            css: {
                text: {
                    header: 'night',
                    lead: 'red',
                    p: 'night'
                }
            },
            video: true,
            order: 1,
            portal: 'consult',
            cssClass: 'white'
        },

        {
            title: 'Graphic Design',
            lead: 'relevant designs',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            row: {
                display: "page"

            },
            content: {

                thumbnail: {
                    src: 'graphic',
                    alt: 'Graphic Design solutions'
                },
                body: {
                    cssClass: 'fixed-row-background',
                    src: 'design'
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'night',
                    p: 'white'
                }
            },
            video: true,
            order: 1,
            portal: 'design',
            cssClass: 'white'
        },

        {
            title: 'Cloud Deployment',
            lead: 'scalable, secure, rubust, everywhere, always',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {

                thumbnail: {
                    src: 'cloud',
                    alt: 'Cloud-base delployment solutions'
                },
                body: {

                    //      src: 'cloud'
                }
            },
            css: {
                text: {
                    header: 'night',
                    lead: 'contrast',
                    p: 'night'
                }
            },
            video: true,
            order: 1,
            portal: 'cloud',
            cssClass: 'white'
        },



        {
            title: 'Brand Strategies',
            lead: 'finding voice for your ideas',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            row: {
                display: "page"

            },
            content: {

                thumbnail: {
                    src: 'brand',
                    alt: 'Brand Strategy Solutions'
                },
                body: {
                    cssClass: 'fixed-row-background',
                    src: 'brand-dark'
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'base',
                    p: 'white'
                }
            },
            video: true,
            order: 1,
            portal: 'brand',
            cssClass: 'white'
        },

        {
            title: 'Search Engine Optimizations',
            lead: 'connecting you are yours',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'seo',
                    alt: 'Search Engine Optimzation Services'
                },
                body: {
                    //      src: 'seo'
                }
            },
            css: {
                text: {
                    header: 'night',
                    lead: 'contrast',
                    p: 'night'
                }
            },
            video: true,
            order: 1,
            portal: 'seo',
            cssClass: 'white'
        },

        {
            title: 'Service Contracts',
            lead: 'forever available, forever up-to-date',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            row: {
                display: "page"

            },
            content: {

                thumbnail: {
                    src: 'service',
                    alt: 'Service Agreement Contracts'
                },
                body: {
                    cssClass: 'fixed-row-background',
                    src: 'service'
                }
            },
            css: {
                text: {
                    header: 'night',
                    lead: 'contrast',
                    p: 'night'
                }
            },
            video: true,
            order: 1,
            portal: 'service',
            cssClass: 'white'
        },

    ];



})();