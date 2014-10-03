(function() {

    'use strict';

    angular.module('gSoft.contact', ['ngRoute', 'gSoft.formsPage'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/contact', {
                templateUrl: 'views/contact/contact.html',
                controller: 'ContactCtrl'
            });
        }
    ])

    .controller('ContactCtrl', ["$scope", "Constants" , "Intercom", "LoadPage", "$rootScope",
        function($scope, Constants, Intercom, LoadPage, $rootScope) {

            if ($rootScope.sendcontact) 
                $scope.backgroundImage = 'thanks';
               
             else { 
                $scope.backgroundImage = 'global';
                LoadPage.scrollbackground($scope, 10000 , ['custom', 'consulting', 'design', 'cloud', 'brand', 'service', 'global']);
            }
            // this variable is used to trigger the bacground state
            $scope.fadeinbackground = true;
            /*  
             * We recieve messages from our form controller and this tells us how to process our view
             */
            $scope.viewSwitch = {};

            Intercom.on($scope, 'forms', function(e, message) {
                //console.log("I am in contact control", message);
                // we can use a switch statement to cascase the view switch. 
                // in this case we will stick with one
                // we reset
                $scope.viewSwitch = {};

                switch (message.verb) {

                    case 'processing':
                        $scope.viewSwitch[message.verb] = true;
                        break;
                    case 'error':
                        $scope.viewSwitch[message.verb] = true;
                        break;
                    case 'complete':
                        $scope.viewSwitch[message.verb] = true;
                        if (message.payload && message.payload.fName)
                            $rootScope.fName = message.payload.fName; // store name in root session
                        
                        // I want to say thank you
                        LoadPage.stopscroll($scope,'thanks');
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
                     else  // otherwise, we show that it is complete
                        $scope.viewSwitch['complete'] = true;
                        break;

                }
            });
            
            // renders the page at various intervals
            LoadPage.render($scope, 400, 400 );

            $scope.form = Constants.FORMS.forms.contact;

        }
    ]);

})();