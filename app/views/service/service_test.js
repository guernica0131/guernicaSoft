'use strict';

describe('myApp.service module', function() {

  beforeEach(module('myApp.service'));

  describe('service controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var SericeCtrl = $controller('service');
      expect(SericeCtrl).toBeDefined();
    }));

  });
});