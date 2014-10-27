'use strict';

describe('gSoft.content module', function() {

  beforeEach(module('gSoft.content'));

  describe('about controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var myScope = $rootScope.$new(),
       globalCtrl = $controller('ContentCtrl', {$scope: myScope});
      expect(globalCtrl).toBeDefined();
    }));

  });
});