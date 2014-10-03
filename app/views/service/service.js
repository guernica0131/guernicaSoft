(function() {

    'use strict';
    // our service view is the default view for users. It is comprised or portals and uses the primary page moduel for page rendering
    angular.module('gSoft.service', ['ngRoute',
        'gSoft.portal',
        'gSoft.pPage',
    ])
    // we set the route as the default view
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/service/service.html',
                controller: 'ServiceCtrl'
            });
        }
    ])

    .controller('ServiceCtrlTest', ["$scope",
        function($scope) {

            this.portals = portals;

        }
    ])

    //.controller("ServiceCtrl", [function() {}])
    // our ServiceCtrl
    .controller('ServiceCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex",
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
            title: 'guernica Softworks',
            lead: 'digital artisans',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {

                thumbnail: {
                    src: 'logo',
                    alt: 'guernica Softworks Logo'
                },
                body: {
                    src: 'global',
                    alt: "Na Na"
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
            portal: 'gSoft',
            cssClass: 'night'
        },

        {
            title: 'Custom Software',
            lead: 'software desgined for you',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'custom',
                    alt: 'Custom Software Solutions'
                },
                body: {
                    src: 'custom',
                    alt: "Na Na"
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
            portal: 'custom',
            cssClass: 'night'
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
                    src: 'consulting'
                }
            },
            css: {
                text: {
                    header: 'white',
                    lead: 'red',
                    p: 'white'
                }
            },
            video: true,
            order: 1,
            portal: 'consult',
            cssClass: 'night'
        },

        {
            title: 'Graphic Design',
            lead: 'relevant designs',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'graphic',
                    alt: 'Graphic Design solutions'
                },
                body: {
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
            cssClass: 'night'
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
                    src: 'cloud'
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
            cssClass: 'night'
        },



        {
            title: 'Brand Strategies',
            lead: 'finding voice for your ideas',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'brand',
                    alt: 'Brand Strategy Solutions'
                },
                body: {
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
            cssClass: 'night'
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
                    src: 'seo'
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
            cssClass: 'night'
        },

        {
            title: 'Service Contracts',
            lead: 'forever available, forever up-to-date',
            body: {
                text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
            },
            content: {
                thumbnail: {
                    src: 'service',
                    alt: 'Service Agreement Contracts'
                },
                body: {
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
            cssClass: 'night'
        },

    ];


})();