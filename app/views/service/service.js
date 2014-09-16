'use strict';

angular.module('gSoft.service', 
	['ngRoute', 
	'gSoft.portal', 
	'gSoft.pPage',
	])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/service/service.html',
    controller: 'ServiceCtrl'
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

.controller('ServiceCtrl', ["$scope", "$routeParams", "$location" , "LoadPage" ,"PortalIndex" , function($scope, $routeParams, $location, LoadPage, PortalIndex) {
	//$scope.greeting = "HI Adam";
	$scope.portals = portals;


    var pIndex = new PortalIndex.i(portals);

    $scope.activeIndex = pIndex.get($routeParams);
    $scope.noShowUp = false;
    $scope.noShowDown = false;

    

    var verifyNavPosition = function(activeIndex)  {
    	console.log("Making the rounds " ,activeIndex);

    	// if (activeIndex === 0) {
    	// 	$scope.noShowUp = true;
    	// } else {
    	// 	$scope.noShowUp = false;
    	// }

     // 	if (activeIndex < portals.length - 1) {
    	// 	$scope.noShowDown = false;
    	// } else {
    	// 	$scope.noShowDown = true;
    	// }

    }

    var pageChanger = function(index) {
    	//console.log("CLICKING and finding hidespin",index  );
    	if (typeof index === 'undefined' || index == pIndex.get($routeParams))
    		return;
		//$scope.$parent.hideSpin = false; 

		angular.element($('#nav-spinner')).removeClass('hidden');

		//$scope.apply()

    	$scope.drawcontent = false;
    	$routeParams.portal = index;
    	$location.search({portal: index})


    	pIndex.setIndex(index, $scope);


    	verifyNavPosition(index);
    }

    verifyNavPosition($scope.activeIndex);

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
		pageChanger(index);    	
    }

    $scope.changePortal = function(position) {

    	var current = pIndex.get($routeParams);

    	console.log("Our current page going " + position + " " , current);

    	if (position === 'up') {
    		if (current === 0)
    			current = portals.length - 1;
    		else 
    			current = --current;

    		pageChanger(current);    	
    	} else if (position === 'down') {
    		if (current === portals.length - 1)
    			current = 0;
    		else 
    			current = ++current;

    		pageChanger(current);
    	}

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
		title: 'Graphic Design',
		lead: 'meaningful designs',
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
		page: 'primary',
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
				src:'cloud'
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
				src:'brand-dark'
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
		title: 'Search Engine Optimizations',
		lead:'connecting you are yours',
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
		page: 'primary',
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