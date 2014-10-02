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

})

// .factory('ImageLocation', function() {

//     var directory = 'images/portals/',
//         resolution = function() {
//             var width = $(window).width();
//             //console.log("My width", width);
//             if (width > 2000)
//                 return 'high';
//             else if (width > 1200)
//                 return 'med';
//             else
//                 return 'low';

//         },
//         retrieve = function(request, name, extension) {

//             extension = extension || 'jpg';
//             switch (request) {
//                 case 'BODY':
//                     return directory + resolution() + '/' + name + '-body' + '.' + extension;
//                 case 'BODY_HIGH':
//                     return directory + 'high/' + name + '-body' + '.' + extension;
//                 case 'BODY_MED':
//                     return directory + 'med/' + name + '-body' + '.' + extension;
//                 case 'BODY_LOW':
//                     return directory + 'low/' + name + '-body' + '.' + extension;
//                 case 'THUMBS':
//                     return directory + 'thumbs/' + name + '-thumb' + '.' + extension;
//                 case 'ROW':
//                     return directory + 'rows' + name + '-row' + '.' + extension;
//                 case 'HEAD':
//                     return directory + resolution() + '/' + name + '-head' + '.' + extension;
//                 default:
//                     return directory;
//             }

//         }

//     return {
//         retrieve: retrieve
//     }

// })
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



.controller('gSoftCtrl', ["$scope", "$log", "LoadPage",
    function($scope, $log, LoadPage) {

        $scope.title = "guernica Softworks";

        // for testing. Revoved in production
        $scope.$log = $log;
        //$scope.constants = Constants;

        LoadPage.timeout(2000).then(function() {
            $scope.drawCurtains = true;
            LoadPage.timeout(1000).then(function() {
                $scope.windowOpened = true;
            });
          
        });
    }
])
    .controller('windowCtrl', ["$scope", "$window",
        function($scope, $window) {
            // $(window).resize(function() {
            //     var win = this;
            //     $scope.$apply(function() {});
            // })

        }
    ])


.constant('Constants', {
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
                    containerClasses: ['pad-20'],
                    elements: [{
                        value: 'Clear',
                        type: 'reset',
                        id: 'reset-login-form',
                        cssClasses: ['btn', 'btn-default', 'btn-lg'],
                    }, {
                        value: 'Login',
                        type: 'submit',
                        id: 'submit-login-form',
                        cssClasses: ['btn', 'btn-primary', 'btn-lg'],
                    }]
                },
                feedback: {
                    'CONTAINER': {
                        'GOOD': ["'has-success'"],
                        'BAD': ["dummy","'has-error'"],
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
                url: 'contacts',
                baseModel: 'contact',
                name: 'contactUs',
                liveChanges: false,
                buttons: {
                    containerClasses: ['btn-group', 'pad-40'],
                    elements: [{
                        value: 'Clear',
                        type: 'reset',
                        id: 'reset-contact-form',
                        cssClasses: ['btn', 'btn-default', 'btn-lg'],
                    }, {
                        value: 'Submit',
                        type: 'submit',
                        id: 'submit-contact-form',
                        cssClasses: ['btn', 'btn-primary', 'btn-lg'],
                    }]
                },
                feedback: {
                    'CONTAINER': {
                        'GOOD': ["'has-success'"],
                        'BAD': ["dummy","'has-error'"],
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
                            helpText: 'Required',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Nicely done! You have followed the rules.",
                            warningHelpText: "This is crazy you can't follow simple rules."
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
                            helpText: 'Required',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Nicely done! You have followed the rules.",
                            warningHelpText: "This is crazy you can't follow simple rules."
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
                            helpText: 'Required',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Nicely done! You have followed the rules.",
                            warningHelpText: "This is crazy you can't follow simple rules."
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
                                value: 'gs',
                                name: "guernica Softworks the company",
                                selected: false
                            }, {
                                value: 'customeSoft',
                                name: 'Custom Software Solutions',
                                selected: false
                            }, {
                                value: 'consult',
                                name: 'ICT Consulting Services',
                                selected: false
                            }, {
                                value: 'graphic',
                                name: 'Master graphic designers',
                                selected: false
                            }, {
                                value: 'cloud',
                                name: 'Cloud Deployment Services',
                                selected: false
                            }, {
                                value: 'brandStrategies',
                                name: 'Brand Strategies',
                                selected: false
                            }, {
                                value: 'servicecontracts',
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
                            helpText: 'This input is required',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Nicely done! You have followed the rules.",
                            warningHelpText: "This is crazy you can't follow simple rules."
                        }


                    },

                    {
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
                            helpText: 'This input is required',
                            errorHelpText: "This field is required with at least 2 characters before I can submit this form.",
                            goodHelpText: "Nicely done! You have followed the rules.",
                            warningHelpText: "This is crazy you can't follow simple rules."
                        }

                    }
                ]
            }
        },
    }

})