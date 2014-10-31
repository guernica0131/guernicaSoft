(function() {

  var gSoftAnimations = angular.module('gSoftAnimations', ['ngAnimate']);

  gSoftAnimations.animation('.curtain', function() {
  	

  	var drawCurtains = function(element, className, done) {
  	
  		jQuery(element).animate({height:45},600, function() {
  	//		console.log("FInsihed");
        var el = this;
       // angular.$timeout(function() {
          $(el).removeClass('closed');
        //}, 600);
  			
  			done();
  		});
  		

  		
  	}

  	return {
  		addClass: drawCurtains,
  		//removeClass: drawCurtains
  	};

  });


   gSoftAnimations.animation('.view-frame', function() {


   	var fadeIn = function(element, className, done) {
   		//console.log('fadeIn');
   		jQuery(element).fadeIn();
   		jQuery(element).removeClass('view-frame-closed')
   	}
   	
   	return {
  		addClass: fadeIn,
  		//removeClass: drawCurtains
  	};

   });

})();