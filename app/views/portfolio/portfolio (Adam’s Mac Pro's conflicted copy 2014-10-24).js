(function() {

    'use strict';
    // our service view is the default view for users. It is comprised or portals and uses the primary page moduel for page rendering
    angular.module('gSoft.portfolio', ['ngRoute',
        'gSoft.portal',
        'gSoft.pPage',
    ])
    // we set the route as the default view
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/portfolio', {
                templateUrl: 'partials/tiled.html',//'views/portfolio/portfolio.html',
                controller: 'PortfolioCtrl'
            });
        }
    ])

    .controller('PortfolioCtrlTest', ["$scope",
        function($scope) {

            this.portals = portals;

        }
    ])
    .controller('PortfolioCtrl', ["$scope", "PortalIndex", "Title",
        function($scope, PortalIndex, Title) {
            Title.set("The guernica Softwork's portfolio");
            //we push our portals into the scope
            $scope.portals = portals;
            // we create a PortalIndex Instance
            var pIndex = new PortalIndex.i(portals);
            // now we set the portal link into the scope
            pIndex.portalLoader($scope);
        }
    ]);

    // change to a REST Call
    var portals = [

        // Portfolio
         {
            title: 'The World Bank',
            route: 'portfolio',
            
            body: {
                lead: 'East Aftrican Tourist Visa',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {

                thumbnail: {
                    src: 'wb',
                    alt: 'World Bank'
                },
                body: {
                    src: 'eab',
                    alt: "Na Na"
                },
                video: false
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'red',
                    p: 'white'
                },
                cssClass: 'contrast'
            },
            
            order: 1,
            portal: 'wb',

        },

        {
            title: 'Ms Marsha\'s Kids',
            route: 'portfolio',
            body: {
                lead: 'a voice for special needs',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'marsha',
                    alt: 'Ms Marsha'
                },
                body: {
                    src: 'marsha',
                    alt: "Na Na"
                },
                video: false
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'blue',
                    p: 'white'
                },
                cssClass: 'contrast'
            },
            
            order: 2,
            portal: 'ms-marsha',
            
        },

        {
            title: 'Java Island',
            route: 'portfolio',
            body: {
                lead: 'the road to...',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'java',
                    alt: 'Java Island'
                },
                body: {
                    src: 'java'
                },
                video: false
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'red',
                    p: 'white'
                },
                cssClass: 'contrast'
            },
            
            order: 3,
            portal: 'consult',
            
        },

         {
            title: 'Nike Community',
            route: 'portfolio',
            body: {
                lead: 'We\'re better together',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'together',
                    alt: 'Nike community'
                },
                body: {
                    src: 'community'
                },
                video: false
            },
            css: {
                text: {
                    header: 'night',
                    lead: 'contrast',
                    p: 'night'
                },
                cssClass: 'contrast'
            },
            
            order: 4,
            portal: 'seo',
            
        },

        {
            title: 'Subspace',
            route: 'portfolio',
            body: {
                lead: 'A community of enthusiasts',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'subspace',
                    alt: 'Subspace continuum'
                },
                body: {
                    src: 'subspace'
                },
                video: false
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'red',
                    p: 'white'
                },
                cssClass: 'contrast'
            },
            
            order: 5,
            portal: 'continuum',
            
        },

        {
            title: 'eCoursity',
            route: 'portfolio',
            body: {
                lead: 'learning market',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'ecoursity',
                    alt: 'eCoursity eLearning marketplace'
                },
                body: {
                    src: 'ecoursity'
                },
                video: false
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'white',
                    p: 'white'
                },
                cssClass: 'contrast'
            },
            
            order: 6,
            portal: 'ecoursity',
            
        },



        {
            title: 'House of fools gaming',
            route: 'portfolio',
            body: {
                lead: 'forever available, forever up-to-date',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'hf',
                    alt: 'House of fools gaming clan'
                },
                body: {
                    src: 'bg'
                },
                video: false
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'base',
                    p: 'white'
                },
                cssClass: 'contrast'
            },
            
            order: 7,
            portal: 'brand',
            
        },

       

        {
            title: 'Brickstr',
            route: 'portfolio',
            body: {
                lead: 'forever available, forever up-to-date',
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'brick',
                    alt: 'Service Agreement Contracts'
                },
                body: {
                   src: 'brick'
                },
                video: false
            },
            css: {
                text: {
                    header: 'night',
                    lead: 'contrast',
                    p: 'night'
                },
                cssClass: 'contrast'
            },
            
            order: 8,
            portal: 'service',
            
        },     

    ];


})();