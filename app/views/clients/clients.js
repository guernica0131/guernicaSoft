(function() {

    'use strict';

    angular.module('gSoft.client', ['ngRoute', 'gSoft.scrollPage'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/clients', {
                templateUrl: 'views/clients/clients.html',
                controller: 'GlobalCtrl'
            });
        }
    ])

    .controller('ClientCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex",
        function($scope, $routeParams, $location, LoadPage, PortalIndex) {
            $scope.portals = portals;
            var pIndex = new PortalIndex.i(portals);
            // now we set the portal link into the scope
            pIndex.portalLoader($scope, $routeParams, $location, LoadPage);

            $scope.head = {
                text: {
                    content: "We a globaly focus independent digital creative studio",
                    tag: "We are guernica Softworks",
                    color:  {
                     content: "white",
                     tag: "white"
                    }
                },
                jumbotron: 'noise',
                image: 'global',
               // curtain: 'noise'
            }

            //$scope.headerImage = "global";

            $('.page-view').on("scroll", function(e) {
                console.log("Hey getting my scroll on", e);
            });

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

                row: {
                    src: ''
                },

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
                text: {
                    header: 'night',
                    lead: 'base',
                    p: 'night'
                }
            },
            video: true,
            order: 1,
            portal: 'gSoft',
            cssClass: 'white'
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
            cssClass: 'white'
        },

    ];



})();