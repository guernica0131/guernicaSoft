'use strict';

angular.module('gSoft.view1', ['ngRoute', 'gSoft.portal', 'ui.router'])

.config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'views/view1/view1.html',
    controller: 'View1Ctrl'
  });

  $stateProvider.state('portalContent', {
  	url: ''
  })

}])
//*/
/*
.controller('view1ContentCtrl', ["$scope", "$routeParams", "PortalIndex" , function($scope, $routeParams, PortalIndex) {
	//$scope.greeting = "HI Adam";
	console.log("My content");

}])*/

.controller('View1Ctrl', ["$scope", "$routeParams", "PortalIndex" , function($scope, $routeParams, PortalIndex) {
	//$scope.greeting = "HI Adam";
	$scope.portals = portals;


    var pIndex = new PortalIndex.i([{},{}]);
    
    //console.log($routeParams);
    console.log(pIndex.get($routeParams));

    $scope.updatePage = function() {
    	//console.log("CLICKING" );
    	//$routeParams.portal = "100"
    	//$scope.$apply();
    }

}]);


var portals = [

	{
		title: 'guernica Softworks',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {

			thumbnail: {
				src: 'logo',
				alt: 'guernica Softworks Logo'
			}, 
			body:  {
				src: 'global',
				alt: "Na Na"
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},

	{
		title: 'Custom Software',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {
			thumbnail: {
				src: 'custom',
				alt: 'Custom Software Solutions'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},

	{
		title: 'ICT Consulting',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {
			thumbnail: {
				src: 'consulting',
				alt: 'Consulting Services'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},

	{
		title: 'Graph Design',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {
			thumbnail: {
				src: 'graphic',
				alt: 'Graphic Design solutions'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},

	{
		title: 'Cloud Deployment',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {
			thumbnail: {
				src: 'cloud',
				alt: 'Cloud-base delployment solutions'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},



	{
		title: 'Brand Strategies',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {
			thumbnail: {
				src: 'brand',
				alt: 'Brand Strategy Solutions'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},

	{
		title: 'Search Engine Optimizations',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {
			thumbnail: {
				src: 'seo',
				alt: 'Search Engine Optimzation Services'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},

	{
		title: 'Service Contracts',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		}, 
		content: {
			thumbnail: {
				src: 'service',
				alt: 'Service Agreement Contracts'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	},

/*	{
		title: 'IT Services',
		b,ody: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
		content: {
			thumbnail: {
				src: 'global',
				alt: 'Information Technology Service Contracts'
			}, 
			body: {
			}
		},
		video: true,
		order: 1,
		page: 'primary',
		cssClass: 'night'
	}
*/


];