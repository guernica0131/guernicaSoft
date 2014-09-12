//ContactCtl

(function() {
    'use strict';


    angular.module('gSoft.Contact', ['ngRoute', 'gSoft.portal', 'gSoft.pPage'])


    .directive('contact', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/contact/contact.html',
            controller: function($scope, $location, LoadPage) {

                console.log("WOrking the contact");

                var closeContact = function() {
                    console.log("Closing form");
                    $scope.thinking = false;
                    $scope.openContactForm = false;
                }

                $scope.openContact = function() {
                    console.log("Opening form");
                    $scope.thinking = false;
                    $scope.confirmed = false;
                    $scope.openContactForm = true;

                }

                $scope.closeContact = closeContact;



                $scope.sendContact = function(portal) {
                    
                    //$scope.confirmed = true;
                    $scope.thinking = true;
                    var contact = $scope.contact;

                    contact.portal = portal.title;
                    console.log("This submits my form", contact);

                    // memics a restful call
                    LoadPage.timeout(1000).then(function() {
                      //$scope.thinking = false;
                      $scope.confirmed = true;
                    });

                }

                //console.log("IS ACTIVE ", $location.path());
                //return false;
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