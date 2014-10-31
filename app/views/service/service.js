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
                templateUrl: 'partials/tiled.html',//'views/service/service.html',
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
    .controller('ServiceCtrl', ["$scope", "$routeParams", "$location", "LoadPage", "PortalIndex", "Title",
        function($scope, $routeParams, $location, LoadPage, PortalIndex, Title) {
            Title.set("guernica Softworks");
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
                text: "We are guernica Softworks, a boutique, independent software studio of digital artisans. We're engineering and design specialist who love building meaningful and impactful technological experiences our clients.",
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
                    lead: 'red',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'gSoft',
            overlay: true,
            cssClass: 'night'
        },

        {
            title: 'Custom Software',
            lead: 'software desgined for you',
            body: {
                text: "We do not believe in one size fits all solutions. Our software products are custom-designed for your unique business and/or project needs. We work closely with our clients to custom taylor products specifilly for you.", 
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
            video: false,
            order: 1,
            portal: 'custom',
           // overlay: true,
            cssClass: 'night'
        },

        {
            title: 'ICT Consulting',
            lead: 'your personal tech gurus',
            body: {
                text: "Everyone needs a techie and we're among the best. Whether you are looking for an ICT consultant for your development project or an enterprise specialist for your cloud-based deployments, we are ready to assist.",
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
            video: false,
            order: 1,
            portal: 'consult',
            cssClass: 'night'
        },

        {
            title: 'Graphic Design',
            lead: 'relevant designs',
            body: {
                text: "Design is our DNA. All gSoft products begin with a comprehessive design campaign, a campaign that is contextually sensitive to your intended audience. We work closely with our clients to select concepts that trigger the most relevant and targeted responses.",
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
                    lead: 'gold',
                    p: 'white'
                }
            },
            video: false,
            order: 1,
            portal: 'design',
            overlay: true,
            cssClass: 'night'
        },

        {
            title: 'Cloud Deployment',
            lead: 'scalable, secure, rubust, everywhere, always',
            body: {
                text: "It's a cloud-based world and we are your experts. Trusted by many of the largest top-tier companies, we deploy products and strategize solutions using the most reliable, scalable, secure, and cost-effective cloud providers. When you work with guernica Softworks, you work with the best.",
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
                    p: 'black'
                }
            },
            video: false,
            order: 1,
             //overlay: true,
            portal: 'cloud',
            cssClass: 'night'
        },



        {
            title: 'Brand Strategies',
            lead: 'finding voice for your ideas',
            body: {
                text:"Your brand is a story and it's our job to tell it. From the ground up, we can help bring your vision to life. From your first logo or your initial webpage to a massive advertising campaign, gSoft can help you find your voice." ,
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
            video: false,
            order: 1,
             overlay: true,
            portal: 'brand',
            cssClass: 'night'
        },

        {
            title: 'S.E.O',//'Search Engine Optimizations',
            lead: 'connecting you are yours',
            body: {
                text: "Your site is only successful if it connects with its intended audience. At guernica Softworks, our engineers are specialists in Search Engine Optimzation. We know the best practices for not only gettig hits, but also keeping the hits coming.",
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
            video: false,
            order: 1,
            portal: 'seo',

            cssClass: 'night'
        },

        {
            title: 'Service Contracts',
            lead: 'forever available, forever up-to-date',
            body: {
                text: "Do you have an open source project that needs maintenance or a custom solution that needs updating? The guernica Softworks development team can help. We offer many great solutions for hosting, updating, managing, modernizing, and extending both open and proprietary software solutions.",
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
            video: false,
            order: 1,
            
            portal: 'service',
            cssClass: 'night'
        },

    ];


})();