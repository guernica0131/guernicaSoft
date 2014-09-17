'use strict';

angular.module('gSoft.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}])

.filter('portal', [function() {
  return function(portals, portal) {
    var i = 0;
    var filtered = portals.filter(function(p, index) {
    	if (p.portal === portal) {
    		i = index;
    		return p;
    	}
    });

	if (filtered.length > 0) 
    	return {
    		portal: filtered[0],
    		index: i,
    		link: portal
    	}
    else
    	return {
    		portal: portals[0],
    		index: 0,
    		link: portals[0].portal
    	}
  };
}])
