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

    .controller('ContactCtrl', ["$scope", "Constants" , "Intercom",
        function($scope, Constants, Intercom) {


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
                        $scope.viewSwitch[message.verb] = true
                        break;
                    case 'error':
                        $scope.viewSwitch[message.verb] = true
                        break;
                    case 'complete':
                        $scope.viewSwitch[message.verb] = true

                        if (message.payload && message.payload.fName)
                            $scope.fName = message.payload.fName;

                        break;
                    default:
                        $scope.viewSwitch = {
                            "form": true
                        };
                        break;

                }
            });

            $scope.form = Constants.FORMS.forms.contact;

        }
    ]);

})();