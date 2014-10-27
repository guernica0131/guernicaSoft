'use strict';

describe('gSoft.contact module', function() {

  beforeEach(module('gSoft.contact'));

  describe('contact controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var myScope = $rootScope.$new(),
       globalCtrl = $controller('ContactCtrl', {$scope: myScope});
      expect(globalCtrl).toBeDefined();
    }));

  });
});