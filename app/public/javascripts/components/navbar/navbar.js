(function() {

    'use strict';

    angular.module('gSoft.navbar', [])
    .directive('navBar', ["$location", "Intercom", "LoadPage",
        function($location, Intercom, LoadPage) {
            return {
                restrict: 'E',
                templateUrl: 'components/navbar/navbar.html',
                controller: ["$scope",
                    function($scope) {

                        $scope.navbar = {};
                        $scope.navbar.thinking = false;

                        Intercom.on($scope, 'thinking', function(e, thoughts) {
                            $scope.navbar.thinking = thoughts;
                        });

                        $scope.buttons = buttons;
                        $scope.isActive = function(selected) {
                            return (selected === $location.path());
                        }

                        $scope.navigating = function(active) {
                            if (active)
                                return;

                            $scope.navbar.thinking = true;
                            LoadPage.timeout(1000).then(function() {
                                $scope.navbar.thinking = false;
                                var navbar_toggle = $('.navbar-toggle');
                                    if (navbar_toggle.is(':visible'))   
                                    navbar_toggle.trigger('click');
                            
                            });

                        }
                    }
                ],
                controllerAs: 'nav',
                scope: true
            }
        }
    ]);

    var buttons = [

        {
            name: "Services",
            cssClass: "night",
            url: "/",
            tooltip: "This discusses our services offered.",
            images: {
                steady: "",
                active: "",
                hover: ""
            }

        },

        {
            name: "Global",
            cssClass: "base",
            url: "/global",
            tooltip: "This link brings us home",
            images: {
                steady: "",
                active: "",
                hover: ""
            }

        },

        {
            name: "Portfolio",
            cssClass: "blue",
            url: "/portfolio",
            tooltip: "This offers a sample of our work",
            images: {
                steady: "",
                active: "",
                hover: ""
            }

        },

        {
            name: "About",
            cssClass: "rust",
            url: "/about",
            tooltip: "This link talks about us",
            images: {
                steady: "",
                active: "",
                hover: ""
            }

        },

        {
            name: "Contact us",
            cssClass: "gold",
            url: "/contact",
            tooltip: "This link talks about us",
            images: {
                steady: "",
                active: "",
                hover: ""
            }

        },

        {
            name: "Client Portal",
            cssClass: "black",
            url: "/clients",
            tooltip: "This is a portal for existing clients",
            images: {
                steady: "",
                active: "",
                hover: ""
            }

        }


    ];

})();