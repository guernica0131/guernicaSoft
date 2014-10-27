(function() {

    'use strict';

    angular.module('gSoft.social', [])
        .factory('SocialRender', function() {

            var allRendered = {
              'facebook': false,
              'twitter': false,
              'gplus': false
            };          

            var check = function(index) {
                
                if (!allRendered || index < 0 || index <= allRendered)
                    return;

                allRendered[index] = true;

                for (var i in allRendered) {
                    var el = allRendered[i];

                     if (!el)
                        return false;
                }               
                return  true;
            }

            var calc = function($scope, index) {
                if (check(index))
                    $scope.socialIn = true;
            }

            return {
                calc: calc
            }

        })
        .run([
            '$rootScope',
            function($rootScope) {
                $rootScope.facebookAppId = '[FacebookAppId]';
            }
        ])

         .directive('social', function(SocialRender) {
        return {
            restrict: 'E',
            templateUrl: 'components/social/social-buttons.html',
            controller: function($scope, Intercom, LoadPage) {    
                Intercom.on($scope, 'social-in', function(e, service) {
                  SocialRender.calc($scope, service)
                });

            },
            controllerAs: 'SocialCtrl'
          //  scope: true,
        }
    })

    .directive('fbLike', [
        '$window', '$rootScope', 'Intercom',
        function($window, $rootScope, Intercom) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    if (!$window.FB) {
                        // Load Facebook SDK
                        $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
                            $window.FB.init({
                                appId: $rootScope.facebookAppId,
                                xfbml: true,
                                version: 'v2.0'
                            });
                            renderLikeButton();
                        });
                    } else {
                        renderLikeButton();
                    }

                    function renderLikeButton() {
                        //SocialRender.calc(scope, 0);
                        Intercom.broadcast('social-in', 'facebook');
                        element.html('<div class="fb-like" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>');
                        $window.FB.XFBML.parse(element.parent()[0]);
                    }
                }
            };
        }
    ])

 .directive('googlePlus', [
      '$window', 'Intercom', function($window, Intercom) {
          return {
              restrict: 'A',
              link: function(scope, element, attrs) {
                  if(!$window.gapi) {
                      // Load Google SDK
                      $.getScript('//apis.google.com/js/platform.js', function() {
                          renderPlusButton();
                      });
                  } else {
                      renderPlusButton();
                  }
                   
                  function renderPlusButton() {
                      //SocialRender.calc(scope, 1)
                      Intercom.broadcast('social-in', 'gplus');
                      element.html('<div class="g-plusone" data-size="medium"></div>');
                      $window.gapi.plusone.go(element.parent()[0]);
                  }
              }
          };
      }
  ])

  .directive('tweet', [
      '$window', 'Intercom', function($window, Intercom) {
          return {
              restrict: 'A',
              scope: {
                  tweet: '=',
                  socialIn: '&'
              },
            //  transclude: true,
              link: function(scope, element, attrs) {
                  if(!$window.twttr) {
                      // Load Twitter SDK
                      $.getScript('//platform.twitter.com/widgets.js', function() {
                        renderTweetButton();
                      });
                  } else {
                      renderTweetButton();
                  }
   
                  function renderTweetButton() {
                      if (!scope.tweet) {
                          // wait for data if it hasn't loaded yet
                          scope.$watch('tweet', function () {
                              renderTweetButton();
                          });
                          return;
                      } else {
                          Intercom.broadcast('social-in', 'twitter');
                          //SocialRender.calc(scope, 2);
                          element.html('<a class="twitter-share-button" href="https://twitter.com/share" data-text="' + scope.tweet + '">Tweet</a>');
                          $window.twttr.widgets.load(element.parent()[0]);
                      }
                  }
              }
          };
      }
  ])

 .directive('pinIt', [
      '$window', '$location', 'ImageLocation',
      function($window, $location, ImageLocation) {
          return {
              restrict: 'A',
              scope: {
                  pinIt: '=',
                  pinItImage: '=',
                  pin: '='
              },
              link: function(scope, element, attrs) {

                if (!scope.pin)
                  return;

                if(!$window.parsePins) {
                    // Load Pinterest SDK
                    (function(d) {
                        var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
                        p.type = 'text/javascript';
                        p.async = true;
                        p.src = '//assets.pinterest.com/js/pinit.js';
                        p.setAttribute('data-pin-hover', true);
                        p.setAttribute('data-pin-shape', 'round');
                        p.setAttribute('data-pin-height', 32);
                        p['data-pin-build'] = 'parsePins';
                        p.onload = function() {
                            if (!!$window.parsePins) {
                                renderPinItButton();
                            } else {
                                setTimeout(p.onload, 100);
                            }
                        };
                        f.parentNode.insertBefore(p, f);
                    } ($window.document));
                } else {
                    renderPinItButton();
                }
   
                function renderPinItButton() {
                    if (!scope.pinIt) {
                        // wait for data if it hasn't loaded yet
                        scope.$watch('pinIt', function () {
                            renderPinItButton();
                        });
                        return;
                    } else {
                        scope.pinItUrl = $location.absUrl();
                        // console.log(ImageLocation.retrieve({name: scope.pinItImage, request: 'BODY'}) );

                        element.html('<a href="//www.pinterest.com/pin/create/button/?url=' + scope.pinItUrl + '&media=' + ImageLocation.retrieve({name: scope.pinItImage, request: 'BODY'}) + '&description=' + scope.pinIt + '" data-pin-do="buttonPin" data-pin-config="beside"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" alt="" /></a>');
                        $window.parsePins(element.parent()[0]);
                    }
                }
              }
          };
      }
  ])

   



})();