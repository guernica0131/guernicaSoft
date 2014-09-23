'use strict';

describe('gSoft.global module', function() {

  beforeEach(module('gSoft.global'));

  describe('global controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var myScope = $rootScope.$new(),
       globalCtrl = $controller('GlobalCtrl', {$scope: myScope});
      expect(globalCtrl).toBeDefined();
    }));

  });
});