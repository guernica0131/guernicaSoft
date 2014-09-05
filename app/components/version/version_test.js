'use strict';

describe('gSoft.version module', function() {
  beforeEach(module('gSoft.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
