(function() {
'use strict';

// Declare app level module which depends on views, and components
angular.module('gSoft', [
    'gSoftAnimations',
    'ngRoute',
    'gSoft.navbar',
    'gSoft.footer',
    'gSoft.ImageFilter',
    'gSoft.social',
    'gSoft.formsPage',
    'gSoft.scrollPage',
    'gSoft.simplePage',
    'gSoft.tiles'
]).
config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
])

.filter('portal', [function() {
  return function(portals, portal) {
    var i = 0;
    var filtered = portals.filter(function(p, index) {
        if (p.portal === portal) {
            i = index;
            return p;
        }
    });

    if (filtered.length > 0) 
        return {
            portal: filtered[0],
            index: i,
            link: portal
        }
    else
        return {
            portal: portals[0],
            index: 0,
            link: portals[0].portal
        }
  };
}])



 .directive('onRender', ["LoadPage", function(LoadPage) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(scope).ready(function() {
            if(!scope.unobscurred)
              LoadPage.timeout(1000).then(function() {
                scope.unobscurred = true;
              });

            });
        }
    };
}])




.service('API', ['$http', '$q',
    function($http, $q) {

        var connect = function(method, url, payload) {

            var deferred = $q.defer();

            $http[method](url, payload)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data, status, headers, config);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject(data, status, headers, config);
                });


            return deferred.promise;

        };

        var bootstrap = function(url, objects) {

            var deferred = $q.defer(),
                models = {},
                resolve = function(models) {
                    deferred.resolve(models);
                };

            angular.forEach(objects, function(model, index) {
                connect('get', url + model, {}).then(function(data, status, headers, config) {
                    models[model] = data;
                    if (index === objects.length - 1)
                        resolve(models);
                }, function(data, status, headers, config) {
                    return deferred.reject({
                        error: "failed to find model",
                        model: model
                    });
                });
            });

            return deferred.promise;
        };

        return {
            connect: connect,
            bootstrap: bootstrap
        }

    }
])

.factory('Title', ["$rootScope",function($rootScope) {

    var set = function(message) {
        $rootScope.title = message;
    }

    return {
        set: set
    }

}])

.factory("Models", ["$location", "$filter", "$rootScope", "$q", "Intercom", "LoadPage",
    function($location, $filter, $rootScope, $q, Intercom, LoadPage) {

        var names = ['forms', 'portals'],
            models,
            index = 'service',
            active = false;

        var set = function(objects) {
            models = objects;
            active = true;
            LoadPage.timeout(200).then(function() {
                Intercom.broadcast('models-loaded');
            });
            
        };

        var validPromise = function(filtered) {
            return (filtered && filtered.length !== 0);
        };

        var getRoute = function(type) {

            var deferred = $q.defer(),

                filter = function() {
                    var objects = models[type],
                        url = $location.$$path.substring(1);
                    if (url === '')
                        url = index;

                    return $filter('orderBy')($filter('filter')(objects, {
                        route: url
                    }, true), 'order', false);
                };



            if (active) {
                var filtered = filter();
                (validPromise(filtered)) ? deferred.resolve(filtered) : deferred.reject({
                    error: 'No portals found for route'
                });
                return deferred.promise;
            }

            Intercom.on($rootScope, 'models-loaded', function() {
                var objects = models[type],
                    url = $location.$$path,
                    filtered = filter();
                return (validPromise(filtered)) ? deferred.resolve(filtered) : deferred.reject({
                    error: 'No portals found for route'
                });
            });

            return deferred.promise;

        };

        var getByIdentity = function(type, identity) {

            //type
            var deferred = $q.defer(),
                filter = (function(type) {
                    var objects = models[type];
                    return $filter('orderBy')($filter('filter')(objects, {
                        identity: identity
                    }, true), 'order', false);

                }),
                send = function() {
                    var filtered = filter(type);
                    (validPromise(filtered)) ? deferred.resolve(filtered) : deferred.reject({
                        error: 'No portals found for route'
                    });
                }

            if (active) {
                send();
                return deferred.promise;
            }

            Intercom.on($rootScope, 'models-loaded', function() {
                send();
            });

            return deferred.promise;
        };

        return {
            getNames: names,
            set: set,
            get: getRoute,
            getByIdentity: getByIdentity
        }

    }
])

.factory('ImageLocation', function() {

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
        retrieve = function(params) {
            var name = params.name,
                request = params.request,
                extension = params.extension;

            if (!name)
                return;

            extension = extension || 'jpg';

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
                    return directory + resolution() + '/' + name + '-row' + '.' + extension;
                case 'HEAD':
                    return directory + resolution() + '/' + name + '-head' + '.' + extension;
                case 'CUT':
                    return directory + 'thumbs/' + name + '-cut' + '.' + extension;
                case 'PORT':
                    return directory + 'portfolio/' + name + '-port' + '.' + extension;
                default:
                    return directory;
            }

        }

    return {
        retrieve: retrieve
    }

})

.factory('Intercom', ["$rootScope",function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.on = function($scope, broadcast, callback) {
        if (!$scope)
            $scope = $rootScope;

        return $scope.$on(broadcast, callback);
    }

    sharedService.shareMessage = function(msg, broadcast) {
        this.message = msg;
        this.broadcast(broadcast);
    };

    sharedService.broadcast = function(broadcast, args) {
        $rootScope.$broadcast(broadcast, args);
    };

    return sharedService;
}])


.factory('LoadPage', ["$q", "$timeout", "$interval", "Intercom", function($q, $timeout, $interval, Intercom) {

    var me = this;
    var interval;

    var openpage = function($scope, primary, secondary) {
        me.timeout(primary).then(function() {
            $scope.loadpage = true;
            me.timeout(secondary).then(function() {
                $scope.loadcontainer = true;
            });
        });
    };

    this.stopscroll = function($scope, image) {

        if (!interval)
            return;

        $interval.cancel(interval);

        if (image) {
            $scope.fadeinbackground = false;
            me.timeout(1550).then(function() {
                $scope.backgroundImage = image
                $scope.fadeinbackground = true;
            });
        }
    };

    this.scrollbackground = function($scope, time, images, selectors) {


        var i = 0;
        interval = $interval(function() {
            $scope.fadeinbackground = false;
            me.timeout(1550).then(function() {

                if (i >= images.length)
                    i = 0;

                $scope.backgroundImage = images[i++];

                $scope.fadeinbackground = true;
            });

        }, time);

    };

    this.render = function($scope, primary, secondary) {
        if ($scope.windowOpened)
            openpage($scope, primary, secondary);


        Intercom.on($scope, 'open-windows', function(e, message) {
            if (message)
                openpage($scope, primary, secondary);
        });

    };

    this.timeout = function(time) {
        var deferred = $q.defer();

        $timeout(function() {
            deferred.resolve();
        }, time || 0);

        return deferred.promise;
    };

    return {
        timeout: this.timeout,
        render: this.render,
        scrollbackground: this.scrollbackground,
        stopscroll: this.stopscroll
    };

}])
    .service('PortalIndex', ["$routeParams", "$location", "$filter", "Intercom", "LoadPage",
        function($routeParams, $location, $filter, Intercom, LoadPage) {
            var pIndex = function(portals) {
                this.activeIndex = 0;
                this.portal = '';
                this.pLength = portals.length;
                this.portals = portals;
                //var me = this;
                this.setPageParams = function(portal, $scope) {
                    if ($scope) {
                        $scope.activePortal = portal;
                        Intercom.broadcast('portal-in', portal);           
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

                this.setIndex = function($scope) {
                    // // lets filter based on name
                    var index = $scope.activeIndex,
                        link = $scope.portalLink;

                    // // set the page paramters
                    // this.setPageParams(filtered, $scope);
                    if (index < 0 || index < this.portals)
                        index = 0;

                    var p = this.portals[index];

                    this.setPageParams((p.portal === link) ? p : this.portals[0], $scope);

                }

                this.get = function() {
                    this.portal = $routeParams.portal || portals[0].portal;
                    // we filter it because we wantt to ensure the user cannot hit an arbitrary link
                    var filtered = $filter('portal')(portals, this.portal);
                    return filtered;
                }

                this.setTimers = function(portal, $scope, load) {
                    // we set the timeout either at 300ms or 3000ms depending on if it is freshly opened
                    var timeout = $scope.windowOpened ? 600 : 3000,
                        ploadTime = load ? 0 : 500,
                        me = this;

                    LoadPage.timeout(ploadTime).then(function() {
                        me.setPageParams(portal, $scope);
                    });
                    // this timeout allows us to mimick restful call
                    LoadPage.timeout(timeout).then(function() {
                        $scope.drawcontent = true;
                    });
                    // this shutsdown the spinner effect in the navbar
                    LoadPage.timeout(timeout * 2).then(function() {
                        Intercom.broadcast('thinking', false);
                    });
                }

                this.portalLoader = function($scope) {
                    // now we set the portal link into the scope
                    var me = this;
                    // setting the portal link
                    var p = me.get();
                    $scope.portalLink = p.link;
                    // we build the portal paramters
                    $scope.activeIndex = p.index || 0;
                    // pageChange is a local function that sets all the appriate params for a page change
                    me.setTimers(me.portals[$scope.activeIndex], $scope, true);
                    // updatePage calls page changer to fill the correct portal
                    var pageChanger = function(index) {
                        //var me = this;
                        // we the imput is indefined or we are traversing a portal we are already at, we return
                        if ($routeParams.portal == me.portals[index].portal)
                            return;
                        // we activate the spinner in the navbar                        
                        Intercom.broadcast('thinking', true);
                        // curtains drawn
                        $scope.drawcontent = false;
                        $scope.activeIndex = index;

                        $routeParams.portal = me.portals[index].portal;
                        // sets the portal as a paramter
                        $location.search({
                            portal: me.portals[index].portal
                        });

                        me.setTimers(me.portals[index], $scope);
                    }; // end page changer

                    $scope.updatePage = function(index) {
                        pageChanger(index);
                    }
                    // surfPortals allows the users to increment or decrement the portals pages
                    $scope.surfPortals = function(position) {
                        var newIndex = me.changePortalIndex(position, $scope.activeIndex);
                        pageChanger(newIndex);
                    }


                }

            }

            return {
                i: pIndex
            }
        }
    ])
    .factory('Router', ["PortalIndex", "Title", "Models",
        function(PortalIndex, Title, Models) {
            var pull = function($scope, omit) {

                // //we push our portals into the scope
                var setLoader = (function(portals) {
                    // we create a PortalIndex Instance
                    var pIndex = new PortalIndex.i(portals);
                    // now we set the portal link into the scope
                    pIndex.portalLoader($scope);
                });


                Models.get('portals').then(function(portals) {
                    //console.log("We resoved it", portals);
                    //console.log("setting portals" , portals);
                    $scope.portals = portals;
                    $scope.loaded = true;
                    setLoader($scope.portals);
                }, function(e) {
                    if (!omit)
                        alert(e.error);
                }); //portals;

            }

            return {
                pull: pull
            }
        }
    ])

 

.controller('gSoftCtrl', ["$scope", "$log", "$sce", "$location", "LoadPage", "Intercom", "Constants", "API", "Models",
    function($scope, $log, $sce, $location, LoadPage, Intercom, Constants, API, Models) {


        $scope.unobscurred = false;

        // for testing. Revoved in production
        $scope.$log = $log;
        //$scope.constants = Constants;
        $scope.trust = function(html) {
            return $sce.trustAsHtml(html);
        };

        $scope.obscure = function(active) {
            if (active)
                return;
            $scope.unobscurred = false;
            
           

        };

        $scope.$on('onRepeatLast', function(scope, element, attrs){
            console.log("Where am I");
        });

        $scope.getAddress = function() {
            var tweet = "Checkout guernicaSoftworks @ " + $location.absUrl();

            return address;
        }
        //url, models
        API.bootstrap(Constants.API, Models.getNames).then(function(models) {
            Models.set(models);
            $scope.drawCurtains = true;
            LoadPage.timeout(1000).then(function() {
                $scope.windowOpened = true;
                Intercom.broadcast("open-windows", true);
            });

        }, function(error) {
            //console.log("I feel rejected", error);
            alert("There was an issue conntecting to the API. Please try again later");
        });

    }
])
    .controller('windowCtrl', ["$scope", "Router",
        function($scope, Router) {
            //
            //Router.pull($scope);
        }
    ])


// we set the route as the default view
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/tiled.html', //'views/service/service.html',
            controller: 'ServiceCtrl',
            reloadOnSearch: false
        })
            .when('/portfolio', {
                templateUrl: 'partials/tiled.html', //'views/service/service.html',
                controller: 'PortfolioCtrl',
                reloadOnSearch: false
            })
            .when('/global', {
                templateUrl: 'partials/story.html', //'views/global/global.html',
                controller: 'GlobalCtrl',
                reloadOnSearch: false
            })
            .when('/about', {
                templateUrl: 'partials/story.html', //'views/global/global.html',
                controller: 'AboutCtrl',
                reloadOnSearch: false

            })
            .when('/clients', {
                templateUrl: 'partials/clients.html', //'views/global/global.html',
                controller: 'ClientCtrl',
                reloadOnSearch: false

            })
            .when('/contact', {
                templateUrl: 'partials/contact.html', //'views/global/global.html',
                controller: 'ContactCtrl',
                reloadOnSearch: false

            })
            .when('/collections', {
                templateUrl: 'partials/collections.html',
                controller: 'CollectionCtrl'
            })
            .when('/contributors', {
                templateUrl: 'partials/story.html', //'views/about/about.html',
                controller: 'ContributorCtrl'
            });

    }
])

.controller('ServiceCtrl', ["$scope", "Title", "Router",
    function($scope, Title, Router) {

        Router.pull($scope);

        $scope.$watch('activePortal', function() {
            var title = ($scope.activePortal && $scope.activePortal.title) ? $scope.activePortal.title : '';
            Title.set("guernica Softworks, " + title);
        });

        Title.set("guernica Softworks ");

    }
])

.controller('PortfolioCtrl', ["$scope", "Title", "Router",
    function($scope, Title, Router) {
        Router.pull($scope);
        $scope.$watch('activePortal', function() {
            var title = ($scope.activePortal && $scope.activePortal.title) ? $scope.activePortal.title : '';
            Title.set("guernica Softworks portfolio, " + title);
        });
        Title.set("guernica Softworks portfolio");

        $scope.noContact = true;
    }
])

.controller('GlobalCtrl', ["$scope", "Title", "Router",
    function($scope, Title, Router) {
        $scope.bgColor = 'night';
        Title.set("guernica Softworks' global focus");
        Router.pull($scope);
    }
])

.controller('AboutCtrl', ["$scope", "Title", "Router",
    function($scope, Title, Router) {
        $scope.bgColor = 'white';
        Title.set("About guernica Softworks");
        Router.pull($scope);
    }
])

.controller('CollectionCtrl', ["$scope", "Title", "Router",
    function($scope, Title, Router) {

        Router.pull($scope);

        var acitvePortal = ($scope.activePortal && $scope.activePortal.title) ? $scope.activePortal.title : "";

        Title.set("guernica Softworks " + acitvePortal);
    }
])

.controller('ContributorCtrl', ["$scope", "Title", "Router",
    function($scope, Title, Router) {
        
        Router.pull($scope);        
        var acitvePortal = ($scope.activePortal && $scope.activePortal.title) ? $scope.activePortal.title : "";
        Title.set("guernica Softworks contributors: " + acitvePortal);
    }
])


.controller('ClientCtrl', ["$scope", "Constants", "Intercom", "LoadPage", "Models", "Router", "Title",
    function($scope, Constants, Intercom, LoadPage, Models, Router, Title) {

        Title.set("guernica Softworks clients");

        Router.pull($scope, true);

        /*
         * We recieve messages from our form controller and this tells us how to process our view
         */
        $scope.viewSwitch = {};
        $scope.message = {};

        $scope.backgroundImage = "login"
        $scope.loadpage = false;
        $scope.loadcontainer = false;
        $scope.fadeinbackground = true;


        LoadPage.render($scope, 400, 400);

        Intercom.on($scope, 'forms', function(e, message) {
            //console.log("I am in contact control", message);
            // we can use a switch statement to cascase the view switch. 
            // in this case we will stick with one
            // we reset
            $scope.viewSwitch = {};
            $scope.message = {};

            switch (message.verb) {

                case 'processing':
                    $scope.viewSwitch[message.verb] = true;
                    break;
                case 'error':
                    $scope.viewSwitch[message.verb] = true;
                    break;
                case 'complete':
                    //$scope.viewSwitch[message.verb] = true;
                    // again for testing
                    $scope.viewSwitch['form'] = true;
                    // here we would redirect to page
                    // but for testing we will send a fake message to the user
                    $scope.message.text = "I'm sorry, but we don't recognize your username and password";
                    $scope.message.color = 'red';

                    break;
                case 'clearing':
                    $scope.message.text = '';
                default:
                    $scope.viewSwitch = {
                        "form": true
                    };
                    break;

            }

            //$scope.form = Constants.FORMS.forms.login;
            Models.getByIdentity('forms', 'login').then(function(form) {

                if (form.length > 0)
                    $scope.form = form[0];
            }); //portals;

        });




    }
])
    .controller('ContactCtrl', ["$scope", "Constants", "Intercom", "LoadPage", "$rootScope", "Models", "Router", "Title",
        function($scope, Constants, Intercom, LoadPage, $rootScope, Models, Router, Title) {

            Title.set("Contact guernica Softworks");

            Router.pull($scope, true);

            if ($rootScope.sendcontact)
                $scope.backgroundImage = 'thanks';

            else {
                $scope.backgroundImage = 'global';
                LoadPage.scrollbackground($scope, 10000, ['custom', 'consulting', 'design', 'cloud', 'brand', 'service', 'global']);
            }
            // this variable is used to trigger the bacground state
            $scope.fadeinbackground = true;
            /*  
             * We recieve messages from our form controller and this tells us how to process our view
             */
            $scope.viewSwitch = {};

            Intercom.on($scope, 'forms', function(e, message) {
                // we can use a switch statement to cascase the view switch. 
                // in this case we will stick with one
                // we reset
                $scope.viewSwitch = {};

                if (message.payload && message.payload.fName)
                    $rootScope.fName = message.payload.fName; // store name in root session

                switch (message.verb) {

                    case 'processing':
                        $scope.viewSwitch[message.verb] = true;
                        break;
                    case 'error':
                        $scope.viewSwitch[message.verb] = true;
                        break;
                    case 'complete':
                        $scope.viewSwitch[message.verb] = true;
                        // I want to say thank you
                        LoadPage.stopscroll($scope, 'thanks');
                        // we use the root scppe because we want this to be stored
                        $rootScope.sendcontact = true; // for a single session

                        break;
                    default:
                        // if there is no data
                        if (!$rootScope.sendcontact)
                        // we set the default
                            $scope.viewSwitch = {
                            "form": true
                        };
                        else // otherwise, we show that it is complete
                            $scope.viewSwitch['complete'] = true;
                        break;

                }
            });

            // renders the page at various intervals
            LoadPage.render($scope, 400, 400);

            Models.getByIdentity('forms', 'contact').then(function(form) {
                if (form.length > 0)
                    $scope.form = form[0];
            });


        }
    ])

.constant('Constants', {
    API: 'https://api.guernicaSoftworks.com/',
    CONTACT: {
        url: 'components/contact/contact.html'
    },

    FORMS: {
        BROADCAST_CHANGES: false, // activate this if we want all form changes broadcasted
    }

});

})();