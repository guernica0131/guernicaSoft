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
    .controller('PortfolioCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex",
        function($scope, $routeParams, $location, LoadPage, PortalIndex) {
            //we push our portals into the scope
            $scope.portals = portals;
            // we create a PortalIndex Instance
            var pIndex = new PortalIndex.i(portals);
            // now we set the portal link into the scope
            pIndex.portalLoader($scope, $routeParams, $location, LoadPage);
        }
    ]);

    // change to a REST Call
    var portals = [

        {
            title: 'The World Bank',
            lead: 'East Aftrican Tourist Visa',
            body: {
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
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'red',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'wb',
            cssClass: 'night'
        },

        {
            title: 'Ms Marsha\'s Kids',
            lead: 'a voice for special needs',
            body: {
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
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'blue',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'ms-marsha',
            cssClass: 'night'
        },

        {
            title: 'Java Island',
            lead: 'the road to...',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'java',
                    alt: 'Java Island'
                },
                body: {
                    src: 'java'
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'red',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'consult',
            cssClass: 'night'
        },

         {
            title: 'Nike Community',
            lead: 'We\'re better together',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'together',
                    alt: 'Nike community'
                },
                body: {
                    src: 'community'
                }
            },
            css: {
                text: {
                    header: 'night',
                    lead: 'contrast',
                    p: 'night'
                }
            },
            video: false,
            order: 1,
            portal: 'seo',
            cssClass: 'night'
        },

        {
            title: 'Subspace',
            lead: 'relevant designs',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'subspace',
                    alt: 'Subspace continuum'
                },
                body: {
                    src: 'subspace'
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'night',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'continuum',
            cssClass: 'night'
        },

        {
            title: 'eCoursity',
            lead: 'learning market',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'ecoursity',
                    alt: 'eCoursity eLearning marketplace'
                },
                body: {
                    src: 'ecoursity'
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'white',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'ecoursity',
            cssClass: 'night'
        },



        {
            title: 'House of fools gaming',
            lead: 'finding voice for your ideas',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'hf',
                    alt: 'House of fools gaming clan'
                },
                body: {
                    src: 'bg'
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'base',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'brand',
            cssClass: 'night'
        },

       

        {
            title: 'Brickstr',
            lead: 'forever available, forever up-to-date',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'brick',
                    alt: 'Service Agreement Contracts'
                },
                body: {
                  //  src: 'service'
                },
                video: {
                    srs: ''
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
            cssClass: 'night'
        },

    ];


})();