'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('guernica Softworks', function() {

  browser.get('index-async.html');

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('service', function() {

    beforeEach(function() {
      browser.get('index.html#/service');
    });


    it('should render / when user navigates to /service', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for  service/);
    });

  });


  describe('global', function() {

    beforeEach(function() {
      browser.get('index-aysnc.html#/global');
    });


    it('should render view2 when user navigates to /global', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for  global/);
    });

  });
});
