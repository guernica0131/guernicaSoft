//ContactCtl

(function() {
    'use strict';


    angular.module('gSoft.Contact', ['ngRoute', 'gSoft.portal', 'gSoft.pPage'])


    .directive('contact', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/contact/contact.html',
            controller: function($scope, $location, Constants, Intercom, LoadPage) {

                $scope.viewSwitch = {};
                $scope.openContactForm = false;

                Intercom.on($scope, 'forms', function(e, message) {
                    console.log("This is my form message", message);
                    // we can use a switch statement to cascase the view switch. 
                    // in this case we will stick with one
                    // we reset
                    $scope.viewSwitch = {};

                    switch (message.verb) {

                        case 'processing':
                            $scope.viewSwitch[message.verb] = true
                            break;
                        case 'error':
                            $scope.viewSwitch[message.verb] = true
                            break;
                        case 'complete':
                            $scope.viewSwitch[message.verb] = true
                            break;
                        default:
                            $scope.viewSwitch = {
                                "form": true
                            };
                            break;

                    }

                });

                // we will update our form for this context
                $scope.changeForm = function(portals, activePortal) {
                    if ($scope.form)
                        return;

                    var form = Constants.FORMS.forms.contact,
                        labelClasses = ['color', 'white'],
                        helpTextClasses = ['help-block', 'color', 'white'];

                    form.buttons = {
                        containerClasses: ['btn-group', 'pad-20'],
                        elements: [{
                            value: 'Send Interests',
                            type: 'submit',
                            id: 'submit-contact-form',
                            cssClasses: ['btn', 'btn-info', 'btn-lg'],
                        }]

                    };

                    var options = [];
                    // we do not want this to be asy
                    angular.forEach(portals, function(portal, index) {
                        //if (index !== 0) 
                        options.push({
                            value: portal.portal,
                            name: portal.title,
                            selected: (portal.title === activePortal.title) ? true : false
                        });

                    });

                    angular.forEach(form.elements, function(element) {
                        element.labelClasses = labelClasses;
                        element.helpTextClasses = helpTextClasses;

                        element.feedback = {};

                        if (element.id === 'select-multiple')
                            element.options = options;

                    });

                    $scope.form = form;

                };

                $scope.closeContact = function() {
                    $scope.openContactForm = false;
                }

                $scope.openContact = function() {
                    $scope.openContactForm = true;
                }


            },

            controllerAs: 'ContactCtl',
            scope: true
            ///  location: true
        }
    });




    /*    .controller('ContactCtl', ["$scope",
        function($scope) {
            console.log("WOrking the contact");

            var closeContact = function() {
                console.log("Closing form");
                $scope.openContactForm = false;
            }

            $scope.openContact = function() {
                console.log("Opening form");
                $scope.openContactForm = true;

            }

            $scope.closeContact = closeContact;



            $scope.sendContact = function(portal) {
                console.log("This submits my form");
            }


        }
    ]);

*/

})()