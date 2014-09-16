//ContactCtl

(function() {
    'use strict';


    angular.module('gSoft.Contact', ['ngRoute', 'gSoft.portal', 'gSoft.pPage'])


    .directive('contact', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/contact/contact.html',
            controller: function($scope, $location, LoadPage) {

                
                var closeContact = function() {
                    $scope.thinking = false;
                    $scope.openContactForm = false;
                    $scope.confirmed = false;
                }

                $scope.closeContact = closeContact;

                var validateEmail = function(email) {
                    var re = /\S+@\S+\.\S+/;
                    return re.test(email);
                }

                var checkEmail = function(val, element) {

                    if (element !== 'email' && val)
                        return true;
                    else if (element === 'email' && val) 
                        //now we verify the email
                        return val && validateEmail(val);
                    
                    return false;

                }

                $scope.openContact = function() {
                    $scope.thinking = false;
                    $scope.confirmed = false;
                    $scope.openContactForm = true;
                }

                $scope.validateForm = function(selector, element) {
                  
                    var el =  $("#" + selector),
                     val = el.val();
                     if ( checkEmail(val, element) )
                         el.siblings('.form-control-feedback').addClass('glyphicon-ok');
                     else
                         el.siblings('.form-control-feedback').removeClass('glyphicon-ok');
                }

                $scope.sendContact = function(portal) {
                    
                    //$scope.confirmed = true;
                    $scope.thinking = true;
                    var contact = $scope.contact;

                    contact.portal = portal.title;
                    // memics a restful call
                    LoadPage.timeout(1000).then(function() {
                      $scope.confirmed = true;
                      $scope.thinking = false;
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