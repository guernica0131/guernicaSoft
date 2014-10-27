'use strict';

// Declare app level module which depends on views, and components
angular.module('gSoft', [
    'gSoftAnimations',
    'ngRoute',
    'gSoft.service',
    'gSoft.global',
    'gSoft.portfolio',
    'gSoft.about',
    'gSoft.navbar',
    'gSoft.client',
    'gSoft.contact',
    'gSoft.footer',
    'gSoft.version',
    'gSoft.version.interpolate-filter',
    'gSoft.ImageFilter',
    'gSoft.social',
    'gSoft.collection',
    'gSoft.contributers'

    //'ui.router'
]).
config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        //$locationProvider.html5Mode(true);
        //$locationProvider.html5Mode(true).hashPrefix('!');
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
                    console.log("Resoving", models);
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

.factory('Title', function($rootScope) {

    var set = function(message) {
        $rootScope.title = message;
    }

    return {
        set: set
    }

})

.factory("Models", ["$location", "$filter", "$rootScope", "$q", "Intercom",
    function($location, $filter, $rootScope, $q, Intercom) {

        var names = ['forms', 'portals'],
            models,
            index = 'service',
            active = false;

        var set = function(objects) {
            models = objects;
            active = true;
            Intercom.broadcast('models-loaded');
        };

        var getRoute = function(type) {

            var deferred = $q.defer(),

                filter = function() {
                    var objects = models[type],
                        url = $location.$$path;
                    if (url === '/')
                        url = index;

                    return $filter('orderBy')($filter('filter')(objects, {
                        route: url
                    }, true), 'order', false);
                },

                validPromise = function(filtered) {
                    return (filtered.length !== 0);
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

        var getByName = function() {

        }

        return {
            getNames: names,
            set: set,
            get: getRoute,
            getByName: getByName
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
                default:
                    return directory;
            }

        }

    return {
        retrieve: retrieve
    }

})

.factory('Intercom', function($rootScope) {
    var sharedService = {};

    sharedService.message = '';

    sharedService.on = function($scope, broadcast, callback) {
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
})


.factory('LoadPage', function($q, $timeout, $interval, Intercom) {

    var me = this;
    var interval;

    var openpage = function($scope, primary, secondary) {
        me.timeout(primary).then(function() {
            $scope.loadpage = true;
            me.timeout(secondary).then(function() {
                $scope.loadcontainer = true;
            });
        });
    }

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
        //else 
        //$interval.cancel(interval);
    }

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

    }

    this.render = function($scope, primary, secondary) {
        if ($scope.windowOpened)
            openpage($scope, primary, secondary);


        Intercom.on($scope, 'open-windows', function(e, message) {
            if (message)
                openpage($scope, primary, secondary);
        });

    }

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

})
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
                        $scope.activeIndex = portal.index;
                        $scope.portalLink = portal.link;
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
                    me.setTimers(me.portals[$scope.activeIndex ], $scope, true);
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
                    } // end page changer

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
        }
    ])



.controller('gSoftCtrl', ["$scope", "$log", "$sce", "$location", "LoadPage", "Intercom", "Constants", "API", "Models",
    function($scope, $log, $sce, $location, LoadPage, Intercom, Constants, API, Models) {



        // for testing. Revoved in production
        $scope.$log = $log;
        //$scope.constants = Constants;
        $scope.trust = function(html) {
            return $sce.trustAsHtml(html);
        }

        $scope.getAddress = function() {
            var tweet = "Checkout guernicaSoftworks @ " + $location.absUrl();

            return address;
        }
        //url, models
        API.bootstrap(Constants.API, Models.getNames).then(function(models) {
            //console.log("Retrieved model", models);
            Models.set(models);
        }, function(error) {
            console.log("I feel rejected", error);
        });

        // there will be an ajax call when this is assigned to a web server
        LoadPage.timeout(2000).then(function() {
            $scope.drawCurtains = true;
            LoadPage.timeout(1000).then(function() {
                $scope.windowOpened = true;
                Intercom.broadcast("open-windows", true);
            });

        });
    }
])
    .controller('windowCtrl', ["$scope", "$window",
        function($scope, $window) {
            // just in case

        }
    ])


.constant('Constants', {
    API: 'http://localhost:1337/',
    CONTACT: {
        url: 'components/contact/contact.html'
    },

    FORMS: {
        BROADCAST_CHANGES: false, // activate this if we want all form changes broadcasted

        forms: {
            login: {
                url: 'login',
                baseModel: 'login',
                name: 'login-form',
                liveChanges: false, // don't need
                buttons: {
                    containerClasses: ['btn-group'],
                    elements: [{
                        value: 'Clear',
                        type: 'reset',
                        id: 'reset-login-form',
                        cssClasses: ['btn', 'btn-default', 'btn-lg'],
                    }, {
                        value: 'Login',
                        type: 'submit',
                        id: 'submit-login-form',
                        cssClasses: ['btn', 'btn-danger', 'btn-lg'],
                    }]
                },
                feedback: {
                    'CONTAINER': {
                        'GOOD': ["'has-success'"],
                        'BAD': ["dummy", "'has-error'"],
                        'WARNING': ["'has-warning'"]
                    },
                    'FEEDBACK': {
                        'GOOD': ["'glyphicon-ok'"],
                        'BAD': ["'glyphicon-remove'"],
                        'WARNING': ["'glyphicon-warning-sign'"]
                    },
                    'FEEDBACK_TEXT': {
                        'GOOD': ["'base'"],
                        'BAD': ["'red'"],
                        'WARNING': ["'gold'"]
                    }
                },
                elements: [{
                        id: 'username',
                        containerClasses: ['form-group', 'has-feedback'],
                        elClasses: ['form-control', 'input-lg'],
                        labelClasses: ['color', 'night'],
                        feedbackClasses: ['glyphicon', 'form-control-feedback'],
                        helpTextClasses: ['help-block', 'color'],
                        el: 'input',
                        type: 'text',
                        model: 'username',
                        min: 6,
                        placeholder: 'Username',
                        label: 'Username',
                        liveFeedback: true,
                        required: true,
                        disabled: false,
                        nospace: true // going to create a directive
                    },

                    {
                        id: 'password',
                        containerClasses: ['form-group', 'has-feedback'],
                        elClasses: ['form-control', 'input-lg'],
                        labelClasses: ['color', 'night'],
                        feedbackClasses: ['glyphicon', 'form-control-feedback'],
                        helpTextClasses: ['help-block', 'color'],
                        el: 'input',
                        type: 'password',
                        model: 'password',
                        liveFeedback: true,
                        placeholder: 'Password',
                        label: 'Password',
                        min: 6,
                        required: true,
                        disabled: false,
                        nospace: true // going to create a directive
                    },


                ]
            },
            contact: {
                url: 'http://localhost:1337/contact',
                method: 'post',
                baseModel: 'contact',
                name: 'contactUs',
                liveChanges: false,
                buttons: {
                    containerClasses: ['btn-group', 'pad-20'],
                    elements: [{
                        value: 'Clear',
                        type: 'reset',
                        id: 'reset-contact-form',
                        cssClasses: ['btn', 'btn-default', 'btn-lg'],
                    }, {
                        value: 'Submit',
                        type: 'submit',
                        id: 'submit-contact-form',
                        cssClasses: ['btn', 'btn-danger', 'btn-lg'],
                    }]
                },
                feedback: {
                    'CONTAINER': {
                        'GOOD': ["'has-success'"],
                        'BAD': ["dummy", "'has-error'"],
                        'WARNING': ["'has-warning'"]
                    },
                    'FEEDBACK': {
                        'GOOD': ["'glyphicon-ok'"],
                        'BAD': ["'glyphicon-remove'"],
                        'WARNING': ["'glyphicon-warning-sign'"]
                    },
                    'FEEDBACK_TEXT': {
                        'GOOD': ["'contrast'"],
                        'BAD': ["'red'"],
                        'WARNING': ["'gold'"]
                    }
                },
                elements: [{
                        id: 'f-name',
                        containerClasses: ['form-group', 'has-feedback'],
                        elClasses: ['form-control', 'input-lg'],
                        labelClasses: ['color', 'night'],
                        feedbackClasses: ['glyphicon', 'form-control-feedback'],
                        helpTextClasses: ['help-block', 'color'],
                        el: 'input',
                        type: 'text',
                        model: 'fName',
                        min: 2,
                        placeholder: 'Please enter your first name',
                        label: 'First Name',
                        liveFeedback: true,
                        required: true,
                        disabled: false,
                        feedback: {
                            // this is our error text
                            helpText: 'required',
                            errorHelpText: "This field require at least 2 characters.",
                            goodHelpText: "Thank you."
                            // warningHelpText: "This is crazy you can't follow simple rules."
                        }
                    },

                    {
                        id: 'l-name',
                        containerClasses: ['form-group', 'has-feedback'],
                        elClasses: ['form-control', 'input-lg'],
                        labelClasses: ['color', 'night'],
                        feedbackClasses: ['glyphicon', 'form-control-feedback'],
                        helpTextClasses: ['help-block', 'color'],
                        el: 'input',
                        type: 'text',
                        model: 'lName',
                        liveFeedback: true,
                        placeholder: 'Please enter your last name',
                        label: 'Last Name',
                        min: 2,
                        required: true,
                        disabled: false,
                        feedback: {
                            // this is our error text
                            helpText: 'required',
                            errorHelpText: "This field require at least 2 characters.",
                            goodHelpText: "Thank you."
                            //warningHelpText: "This is crazy you can't follow simple rules."
                        }


                    },

                    {
                        id: 'email',
                        containerClasses: ['form-group', 'has-feedback'],
                        elClasses: ['form-control', 'input-lg'],
                        labelClasses: ['color', 'night'],
                        feedbackClasses: ['glyphicon', 'form-control-feedback'],
                        helpTextClasses: ['help-block', 'color'],
                        el: 'input',
                        type: 'email',
                        model: 'email',
                        liveFeedback: true,
                        placeholder: 'Please enter your email address',
                        label: 'Email address',
                        required: true,
                        disabled: false,
                        nospace: true,
                        feedback: {
                            // this is our error text
                            helpText: 'required',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Thank you."
                            //warningHelpText: "This is crazy you can't follow simple rules."
                        }


                    },

                    {
                        id: 'select-multiple',
                        containerClasses: ['form-group', 'has-feedback'],
                        elClasses: ['form-control', 'input-lg'],
                        labelClasses: ['color', 'night'],
                        feedbackClasses: ['glyphicon', 'form-control-feedback'],
                        helpTextClasses: ['help-block', 'color'],
                        multiple: true,
                        readonly: false,
                        el: 'selectMultiple',
                        options: [{
                                value: 'gSoft',
                                name: "guernica Softworks the company",
                                selected: false
                            }, {
                                value: 'custom',
                                name: 'Custom Software Solutions',
                                selected: false
                            }, {
                                value: 'consult',
                                name: 'ICT Consulting Services',
                                selected: false
                            }, {
                                value: 'design',
                                name: 'Master graphic designers',
                                selected: false
                            }, {
                                value: 'cloud',
                                name: 'Cloud Deployment Services',
                                selected: false
                            }, {
                                value: 'brand',
                                name: 'Brand Strategies',
                                selected: false
                            }, {
                                value: 'seo',
                                name: 'Search Engine Optimization',
                                selected: false
                            }, {
                                value: 'service',
                                name: 'Service contracts',
                                selected: false
                            }, {
                                value: 'globalservice',
                                name: 'Our global focus',
                                selected: false
                            }, {
                                value: 'opensource',
                                name: 'Opensource customization',
                                selected: false
                            }, {
                                value: 'portfolio',
                                name: 'Our porfolio',
                                selected: false
                            }

                        ],
                        liveFeedback: true,
                        model: 'interests',
                        label: 'Interest categories',
                        required: false,
                        disabled: false,
                        feedback: {
                            // this is our error text
                            helpText: 'optional',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Thank you.",
                            warningHelpText: "This field is optional but it would help us to know more."
                        }


                    }, {
                        id: 'extra-details',
                        containerClasses: ['form-group', 'has-feedback'],
                        elClasses: ['form-control', 'input-lg'],
                        labelClasses: ['color', 'night'],
                        feedbackClasses: ['glyphicon', 'form-control-feedback'],
                        helpTextClasses: ['help-block', 'color'],
                        rows: 3,
                        cols: 55,
                        maxlength: 10000,
                        readonly: false,
                        el: 'textarea',
                        model: 'about',
                        liveFeedback: true,
                        placeholder: 'Please enter some details of what you are looking for...',
                        label: 'Tell us more about your needs',
                        required: false,
                        disabled: false,
                        feedback: {
                            // this is our error text
                            helpText: 'optional',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Thank you.",
                            warningHelpText: "This field is optional but it would help us to know more."
                        }

                    }
                ]
            }
        },
    }

})