'use strict';

// Declare app level module which depends on views, and components
angular.module('gSoft', [
  'gSoftAnimations',
  'ngRoute',
  'gSoft.service',
  'gSoft.global',
  'gSoft.navbar',
  'gSoft.footer',
  'gSoft.version',
  'gSoft.version.interpolate-filter'

  //'ui.router'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/'});
}])
.factory('LoadPage', function($q, $timeout) {

  var timeout = function(time) {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve(['Hello', 'world!']);
    }, time || 0);

    return deferred.promise;
  };

  return {
    timeout: timeout
  };

}).factory('ImageLocation', function() {

    var directory = 'images/portals/',
    resolution = function() {
     var width = $(window).width();
     //console.log("My width", width);
     if (width > 2000) 
      return 'high';
     else if (width > 1200)
      return 'med';
     else 
      return 'low';

    },
     retrieve = function(request, name, extension) {

      extension = extension || 'jpg';

      switch (request) {
        case 'BODY':
            return directory +  resolution() + '/' + name  + '-body' + '.' + extension;
        case 'BODY_HIGH':
          return directory + 'high/' + name + '-body' + '.' + extension;
         case 'BODY_MED':
          return directory + 'med/' + name + '-body' + '.' + extension;
           case 'BODY_LOW':
          return directory + 'low/' + name + '-body' + '.' + extension;
        case 'THUMBS':
          return directory + 'thumbs/' + name + '-thumb' + '.' + extension;
        default:
         return directory;
      }

    }

    return {
      retrieve: retrieve
    }

})
.factory('PortalIndex', function($filter) {

    var pIndex = function(portals) {
      this.activeIndex = 0;
      this.portal = '';
      this.pLength = portals.length;
      this.portals = portals;

      this.setPageParams = function(filtered, $scope) {
        //console.log("My filter " , filtered );
        if ($scope) {
          $scope.activePortal =  filtered.portal;
          $scope.activeIndex = filtered.index;
          $scope.portalLink = filtered.link;
        }
        

      }

      var incrementIndex = function(current) {
        if (current === 0)
          current = portals.length - 1;
        else 
          current = --current;
        return current;
      }

      var decrementIndex = function(current) {
        if (current === portals.length - 1)
          current = 0;
        else 
          current = ++current;
        return current;
      }

      this.changePortalIndex = function(position, activeIndex) {
        var current = activeIndex;//pIndex.get($routeParams);
        if (position === 'up') {
          return incrementIndex(current);
        } else if (position === 'down') {
          return decrementIndex(current);
        }
      }

      this.setIndex = function(portal, $scope) {
        // lets filter based on name
        var filtered = $filter('portal')(portals, this.portal );
        // set instance variables
        this.portal = portal;
        this.activeIndex = filtered.index;
        
        // set the page paramters
        this.setPageParams(filtered, $scope);
        
      }

      this.get = function($routeParams) {
        this.portal = $routeParams.portal || portals[0].portal ;
        // we filter it because we wantt to ensure the user cannot hit an arbitrary link
        var filtered = $filter('portal')(portals, this.portal );
        return filtered.link;
      }

    }

    return {
      i : pIndex
    }
})

.constant('constants', {
  CONTACT: {
    url: 'components/contact/contact.html'
  }
  
})


.controller('gSoftCtrl', ["$scope", "$log",  "LoadPage" , 'constants', function($scope, $log, LoadPage, constants) {

    $scope.$log = $log;

    //$log.log(constants.CONTACT.url);
    $scope.constants = constants;

    //$scope.hideSpin = true;
		//$scope.greeting = "HI Adam";	
		LoadPage.timeout(2000).then(function() {
		//console.log("I promise", control);
			$scope.drawCurtains = true;
			LoadPage.timeout(1000).then(function() {
				//console.log("Opening window");
				$scope.windowOpened = true;
			});
			///	control.windowOpened();
			//gSoftAnimations.drawCurtains();
		});
}])
.controller('windowCtrl', ["$scope", "$window" , "LoadPage" , 
  function($scope, $window, $routeParams, LoadPage, PortalIndex) {


  // $(function() {


  //   angular.element( $('.page-body') ).bind("scroll", function() {
  //     console.log("Scrolling with angular page body");
  //   });


 
  // })
	 
  // angular.element($window).bind("scroll", function(e) {
  //   //$(window).scrollTop()
  //   console.log("Scrolling with angular window" );

  // });

//    $(window).resize(function(){
//    // alert(window.innerWidth);
//     var win = this;
//     $scope.$apply(function(){
//        //do something to update current scope based on the new innerWidth and let angular update the view.
//        //console.log("Resizing" , $(win).width());
//     });
// })

}]);



