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

            /*
            $scope.portalLink = pIndex.get($routeParams);
            // we build the portal paramters
            pIndex.setIndex($scope.portalLink, $scope);
            // pageChange is a local function that sets all the appriate params for a page change
            var pageChanger = function(portal) {
                    // we the imput is indefined or we are traversing a portal we are already at, we return
                    if (typeof portal === 'undefined' || portal == pIndex.get($routeParams))
                        return;
                    // we activate the spinner in the navbar
                    angular.element($('#nav-spinner')).removeClass('hidden');
                    $scope.drawcontent = false;
                    $routeParams.portal = portal;
                    // sets the portal as a paramter
                    $location.search({
                        portal: portal
                    })
                    // set index actually creates the page content
                    pIndex.setIndex(portal, $scope);

                }
                // we set the timeout either at 300ms or 3000ms depending on if it is freshly opened
            var timeout = $scope.windowOpened ? 300 : 3000;
            // this timeout allows us to mimick restful call
            LoadPage.timeout(timeout).then(function() {
                $scope.drawcontent = true;
            });
            // this shutsdown the spinner effect in the navbar
            LoadPage.timeout(timeout * 2).then(function() {
                angular.element($('#nav-spinner')).addClass('hidden');
            });
            // updatePage calls page changer to fill the correct portal
            $scope.updatePage = function(index) {
                pageChanger(index);
            }
            // surfPortals allows the users to increment or decrement the portals pages
            $scope.surfPortals = function(position) {
                var newIndex = pIndex.changePortalIndex(position, $scope.activeIndex);
                pageChanger(portals[newIndex].portal);
            }
*/
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