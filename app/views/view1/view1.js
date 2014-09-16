'use strict';

angular.module('gSoft.view1', 
	['ngRoute', 
	'gSoft.portal', 
	'gSoft.pPage',
	//'gSoft.Contact'
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'views/view1/view1.html',
    controller: 'View1Ctrl'
  });

  /*$stateProvider.state('portalContent', {
  	url: ''
  })*/

}])
//*/
/*
.controller('view1ContentCtrl', ["$scope", "$routeParams", "PortalIndex" , function($scope, $routeParams, PortalIndex) {
	//$scope.greeting = "HI Adam";
	console.log("My content");

}])*/

.controller('View1Ctrl', ["$scope", "$routeParams", "$location" , "LoadPage" ,"PortalIndex" , function($scope, $routeParams, $location, LoadPage, PortalIndex) {
	//$scope.greeting = "HI Adam";
	$scope.portals = portals;


    var pIndex = new PortalIndex.i(portals);

    $scope.activeIndex = pIndex.get($routeParams);

    var timeout = $scope.windowOpened ? 300 : 3000;


   	LoadPage.timeout(timeout).then(function() {
   		console.log("I was triggered");
   		
   		$scope.drawcontent = true;
   	});

   	LoadPage.timeout(timeout * 2).then(function() {
   		angular.element($('#nav-spinner')).addClass('hidden');
   	});

    
    
    //console.log($routeParams);
   // console.log();

    $scope.updatePage = function(index) {
    	console.log("CLICKING and finding hidespin",$scope.$parent.hideSpin  );


    	
    	if (index == pIndex.get($routeParams))
    		return;


		//$scope.$parent.hideSpin = false; 

		angular.element($('#nav-spinner')).removeClass('hidden');

		//$scope.apply()

    	$scope.drawcontent = false;
    	$routeParams.portal = index;
    	$location.search({portal: index})


    	pIndex.setIndex(index, $scope);

    	  ///$location.path(  $location.path() )


    	

    	//$scope.$apply();
    }

}]);


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
			body:  {
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
		page: 'primary',
		cssClass: 'night'
	},

	{
		title: 'Custom Software',
		lead: 'software desgined for you',
		body: {
			text: 'Fusce a quam. Nam adipiscing. Vivamus aliquet elit ac nisl. Curabitur a felis in nunc fringilla tristique. Phasellus consectetuer vestibulum elit. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.',
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
		page: 'primary',
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