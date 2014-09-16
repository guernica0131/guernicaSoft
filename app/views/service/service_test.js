'use strict';

describe('myApp.service module', function() {

  beforeEach(module('myApp.view1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('service');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});