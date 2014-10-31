//ContactCtl

(function() {
    'use strict';


    angular.module('gSoft.Contact', ['ngRoute', 'gSoft.portal', 'gSoft.pPage'])


    .directive('contact', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/contact/contact.html',
            controller: ['$scope', '$location', 'Constants', 'Intercom', 'LoadPage', "Models",
                function($scope, $location, Constants, Intercom, LoadPage, Models) {

                    $scope.viewSwitch = {};
                    $scope.openContactForm = false;


                    var run = function(form) {
                        //console.log("Running", $scope.activePortal);

                        if (!form || !$scope.activePortal)
                            return;

                        //var form = $scope.form;
                        //$scope.activePortal
                        // we rebuild each of our options for the portal load
                        var setoptions = function(options, callback) {
                            var opt = [];

                            angular.forEach(options, function(p, index) {


                                if (p.value === $scope.activePortal.portal)
                                    p.selected = true;
                                else
                                    p.selected = false;

                                //console.log($scope.activePortal.portal, p);
                                //opt.push(p);
                                if (index === options.length - 1)
                                    callback();

                            });

                        }
                        angular.forEach(form.elements, function(element) {
                            if (element.id === 'select-multiple')
                                setoptions(element.options, function() {
                                    
                                    
                                    var newForm = (typeof $scope.form === 'undefined');                                    

                                    $scope.form = form;


                                    console.log("My options", $scope.form.elements);
                                    
                                    if (!newForm)
                                        Intercom.broadcast('form-altered');
                                });

                        });

                    };

                    Models.getByIdentity('forms', 'contact-extra').then(function(form) {
                        if (form.length > 0) { // @TODO, FIX
                            $scope.form = form[0];
                            // run(form[0]); // $scope.form = form[0];

                            // Intercom.on($scope, 'portal-in', function(e, portal) {
                            //     var f = $scope.form || form[0];
                            //     run(f);
                            // });

                        }

                    }); //portals;




                    Intercom.on($scope, 'forms', function(e, message) {
                        //console.log("This is my form message", message);
                        // we can use a switch statement to cascase the view switch. 
                        // in this case we will stick with one
                        // we reset
                        $scope.viewSwitch = {};

                        if (message.payload && message.payload.fName)
                            $scope.fName = message.payload.fName;

                        switch (message.verb) {

                            case 'processing':
                                $scope.viewSwitch[message.verb] = true;
                                break;
                            case 'error':

                                $scope.viewSwitch[message.verb] = true;
                                break;
                            case 'complete':
                                // a complete gets the payload and we update the name object
                                $scope.viewSwitch[message.verb] = true;
                                break;
                            default:
                                $scope.viewSwitch = {
                                    "form": true
                                };
                                break;

                        }

                    });

                    // we will update our form for this context
                    $scope.changeForm = function() {





                        // var run = function() {
                        //     if (!$scope.form || !$scope.activePortal)
                        //         return;

                        //     var form = $scope.form;
                        //     //$scope.activePortal
                        //     // we rebuild each of our options for the portal load
                        //     var setoptions = function(options, callback) {
                        //         var opt = [];

                        //         angular.forEach(options, function(p, index) {


                        //             if (p.value === $scope.activePortal.portal)
                        //                 p.selected = true;

                        //             console.log($scope.activePortal.portal, p);
                        //             //opt.push(p);
                        //             if (index === options.length - 1)
                        //                 callback();

                        //         });

                        //         //callback(opt);
                        //     }

                        //     // angular.forEach($scope.portals, function(p, index) {
                        //     //     if (portal.title)
                        //     //         options.push({
                        //     //             value: p.portal,
                        //     //             name: p.title,
                        //     //             selected: (p.title === portal.title) ? true : false
                        //     //         });

                        //     // });
                        //     // we alter the existing
                        //     angular.forEach(form.elements, function(element) {
                        //         if (element.id === 'select-multiple')
                        //             setoptions(element.options, function() {
                        //                 //  console.log("Before the!", element.options);
                        //                 //console.log("What the!", options);
                        //                 //element.options = options;
                        //                 // $scope.$apply(function() {

                        //                 // });

                        //                 $scope.form = form;

                        //             }); //element.options = options;

                        //     });





                        // }

                        // Intercom.on($scope, 'portal-in', function(e, portal) {
                        //     run();
                        // });


                    };

                    $scope.closeContact = function() {
                        $scope.openContactForm = false;
                    }

                    $scope.openContact = function() {
                        $scope.openContactForm = true;
                    }


                }
            ],

            controllerAs: 'ContactCtl',
            scope: true
            ///  location: true
        }
    });





})()