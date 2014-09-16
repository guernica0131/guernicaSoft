'use strict';

// Declare app level module which depends on views, and components
angular.module('gSoft', [
  'gSoftAnimations',
  'ngRoute',
  'gSoft.view1',
  'gSoft.view2',
  'gSoft.navbar',
  'gSoft.footer',
  'gSoft.version'

  //'ui.router'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/view1'});
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
     console.log("My width", width);

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
.factory('PortalIndex', function() {

    var pIndex = function(portals) {
      this.activeIndex = 0;
      this.pLength = portals.length;
      this.portals = portals;

      this.incrementIndex = function() {
         if (this.activeIndex < this.pLength) 
            this.activeIndex++;
         else 
            this.activeIndex = 0;
      }

      this.decrementIndex = function() {
          if (this.activeIndex > 0) 
            this.activeIndex--; 
      }

      this.setIndex = function(index, $scope) {
        this.activeIndex = index;
        if ($scope)
           $scope.activeIndex = index;
      }

      this.get = function($routeParams) {
          var index = $routeParams.portal || 0;
          if (index > 0 && index < this.pLength)
              //this.activeIndex = 0;
              this.activeIndex = index;
        //console.log("Is the getting called", $routeParams);   
          return this.activeIndex;

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


  $(function() {


    angular.element( $('.page-body') ).bind("scroll", function() {
      console.log("Scrolling with angular page body");
    });


 
  })
	 
  angular.element($window).bind("scroll", function(e) {
    //$(window).scrollTop()
    console.log("Scrolling with angular window" );

  });

  
  




   $(window).resize(function(){
   // alert(window.innerWidth);
    var win = this;
    $scope.$apply(function(){
       //do something to update current scope based on the new innerWidth and let angular update the view.
       console.log("Resizing" , $(win).width());
    });
})

}]);



