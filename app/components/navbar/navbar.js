(function() {

    'use strict';

    angular.module('gSoft.navbar', [])

    // .config(['$routeProvider', function($routeProvider) {
    //  	$routeProvider.when('/view1', {
    //    	templateUrl: 'views/view1/view1.html',
    //    	controller: 'View1Ctrl'
    //  	});
    // }])

    .directive('navBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',
            controller: function($scope, $location) {
            	
        		$scope.buttons = buttons;
        		$scope.isActive = function(selected) {
        			return (selected === $location.path());

        			//console.log("IS ACTIVE ", $location.path());
        			//return false;
        		}
            },
            controllerAs: 'nav',
            scope: true,
          ///  location: true
        }
    });

/*    .controller('navbarCtrl', ["$scope",
        function($scope) {
        	console.log("This is the controller");

        	$scope.buttons = buttons;
            //$scope.greeting = "HI Adam";
        }
    ]);*/
	  var buttons = [

        {
            name: "Services",
            cssClass: "night",
            url: "/services",
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
            url: "/client",
            tooltip: "This is a portal for existing clients",
            images: {
                steady: "",
                active: "",
                hover: ""
            }

        }


    ];

})();