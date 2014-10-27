'use strict';

describe('gSoft.client module', function() {

  beforeEach(module('gSoft.client'));

  describe('client controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var myScope = $rootScope.$new(),
       globalCtrl = $controller('ClientCtrl', {$scope: myScope});
      expect(globalCtrl).toBeDefined();
    }));

  });
});