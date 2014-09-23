'use strict';

// Declare app level module which depends on views, and components
angular.module('gSoft', [
    'gSoftAnimations',
    'ngRoute',
    'gSoft.service',
    'gSoft.global',
    'gSoft.navbar',
    'gSoft.footer',
    'gSoft.version',
    'gSoft.version.interpolate-filter'

    //'ui.router'
]).
config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
])
    .factory('LoadPage', function($q, $timeout) {

        var timeout = function(time) {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve(['Hello', 'world!']);
            }, time || 0);

            return deferred.promise;
        };

        return {
            timeout: timeout
        };

    }).factory('ImageLocation', function() {

        var directory = 'images/portals/',
            resolution = function() {
                var width = $(window).width();
                //console.log("My width", width);
                if (width > 2000)
                    return 'high';
                else if (width > 1200)
                    return 'med';
                else
                    return 'low';

            },
            retrieve = function(request, name, extension) {

                extension = extension || 'jpg';

                console.log("GETTING SIZE", name);

                switch (request) {
                    case 'BODY':
                        return directory + resolution() + '/' + name + '-body' + '.' + extension;
                    case 'BODY_HIGH':
                        return directory + 'high/' + name + '-body' + '.' + extension;
                    case 'BODY_MED':
                        return directory + 'med/' + name + '-body' + '.' + extension;
                    case 'BODY_LOW':
                        return directory + 'low/' + name + '-body' + '.' + extension;
                    case 'THUMBS':
                        return directory + 'thumbs/' + name + '-thumb' + '.' + extension;
                    case 'ROW':
                        return directory + 'rows' + name + '-row' + '.' + extension;
                    case 'HEAD':
                        return directory + resolution() + '/' + name + '-head' + '.' + extension;
                    default:
                        return directory;
                }

            }

        return {
            retrieve: retrieve
        }

    })
    .factory('PortalIndex', function($filter) {

        var pIndex = function(portals) {
            this.activeIndex = 0;
            this.portal = '';
            this.pLength = portals.length;
            this.portals = portals;

            this.setPageParams = function(filtered, $scope) {
                //console.log("My filter " , filtered );
                if ($scope) {
                    $scope.activePortal = filtered.portal;
                    $scope.activeIndex = filtered.index;
                    $scope.portalLink = filtered.link;
                }


            }

            var incrementIndex = function(current) {
                if (current === 0)
                    current = portals.length - 1;
                else
                    current = --current;
                return current;
            }

            var decrementIndex = function(current) {
                if (current === portals.length - 1)
                    current = 0;
                else
                    current = ++current;
                return current;
            }

            this.changePortalIndex = function(position, activeIndex) {
                var current = activeIndex; //pIndex.get($routeParams);
                if (position === 'up') {
                    return incrementIndex(current);
                } else if (position === 'down') {
                    return decrementIndex(current);
                }
            }

            this.setIndex = function(portal, $scope) {
                // lets filter based on name
                var filtered = $filter('portal')(portals, this.portal);
                // set instance variables
                this.portal = portal;
                this.activeIndex = filtered.index;

                // set the page paramters
                this.setPageParams(filtered, $scope);

            }

            this.get = function($routeParams) {
                this.portal = $routeParams.portal || portals[0].portal;
                // we filter it because we wantt to ensure the user cannot hit an arbitrary link
                var filtered = $filter('portal')(portals, this.portal);
                return filtered.link;
            }

            this.portalLoader = function($scope, $routeParams, $location, LoadPage) {
                // now we set the portal link into the scope
                var me = this;

                $scope.portalLink = me.get($routeParams);
                // we build the portal paramters
                me.setIndex($scope.portalLink, $scope);
                // pageChange is a local function that sets all the appriate params for a page change
                var pageChanger = function(portal) {
                        // we the imput is indefined or we are traversing a portal we are already at, we return
                        if (typeof portal === 'undefined' || portal == me.get($routeParams))
                            return;
                        // we activate the spinner in the navbar
                        angular.element($('#nav-spinner')).removeClass('hidden');
                        $scope.drawcontent = false;
                        $routeParams.portal = portal;
                        // sets the portal as a paramter
                        $location.search({
                            portal: portal
                        })
                        // set index actually creates the page content
                        me.setIndex(portal, $scope);

                    }
                    // we set the timeout either at 300ms or 3000ms depending on if it is freshly opened
                var timeout = $scope.windowOpened ? 300 : 3000;
                // this timeout allows us to mimick restful call
                LoadPage.timeout(timeout).then(function() {
                    $scope.drawcontent = true;
                });
                // this shutsdown the spinner effect in the navbar
                LoadPage.timeout(timeout * 2).then(function() {
                    angular.element($('#nav-spinner')).addClass('hidden');
                });
                // updatePage calls page changer to fill the correct portal
                $scope.updatePage = function(index) {
                    pageChanger(index);
                }
                // surfPortals allows the users to increment or decrement the portals pages
                $scope.surfPortals = function(position) {
                    var newIndex = me.changePortalIndex(position, $scope.activeIndex);
                    pageChanger(portals[newIndex].portal);
                }

            }

        }

        return {
            i: pIndex
        }
    })

.constant('constants', {
    CONTACT: {
        url: 'components/contact/contact.html'
    }

})


.controller('gSoftCtrl', ["$scope", "$log", "LoadPage", 'constants',
    function($scope, $log, LoadPage, constants) {

        $scope.$log = $log;

        //$log.log(constants.CONTACT.url);
        $scope.constants = constants;

        //$scope.hideSpin = true;
        //$scope.greeting = "HI Adam";	
        LoadPage.timeout(2000).then(function() {
            //console.log("I promise", control);
            $scope.drawCurtains = true;
            LoadPage.timeout(1000).then(function() {
                //console.log("Opening window");
                $scope.windowOpened = true;
            });
            ///	control.windowOpened();
            //gSoftAnimations.drawCurtains();
        });
    }
])
    .controller('windowCtrl', ["$scope", "$window", "LoadPage",
        function($scope, $window, $routeParams, LoadPage, PortalIndex) {


            // $(function() {


            /*   angular.element($('#scroll-container')).bind("scroll", function() {
                console.log("Scrolling with angular page body");
            });

            $('#scroll-container').on("scroll", function() {
                console.log("This is mine");
            });



            // })

            angular.element($window).bind("scroll", function(e) {
                //$(window).scrollTop()
                console.log("Scrolling with angular window", e);

            });*/

            $(window).resize(function() {
                // alert(window.innerWidth);
                var win = this;
                $scope.$apply(function() {
                    //do something to update current scope based on the new innerWidth and let angular update the view.
                    //console.log("Resizing" , $(win).width());
                });
            })

        }
    ]);