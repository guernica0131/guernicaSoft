'use strict';

describe('gSoft.about module', function() {

  beforeEach(module('gSoft.about'));

  describe('about controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var myScope = $rootScope.$new(),
       globalCtrl = $controller('AboutCtrl', {$scope: myScope});
      expect(globalCtrl).toBeDefined();
    }));

  });
});