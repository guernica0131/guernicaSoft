'use strict';

describe('gSoft.service module', function() {

	var controller,
		LoadPage,
  		myScope;

 beforeEach(function() {
  	module('gSoft.service');
 });

 describe('service controller', function(){

    it('should exist', inject(function($controller, $rootScope) {
      //spec body
      var myScope = $rootScope.$new(),
       serviceCtrl = $controller('ServiceCtrlTest', { $scope: myScope });
       expect(serviceCtrl).toBeDefined();

    }));

     it('should have portals', inject(function($controller, $rootScope) {
     	var myScope = $rootScope.$new(),
     	serviceCtrl = $controller('ServiceCtrlTest', { $scope: myScope });
     	//console.log("MY COntrollers", serviceCtrl);
     	expect(serviceCtrl.portals).toBeDefined();

     }));



  });
});