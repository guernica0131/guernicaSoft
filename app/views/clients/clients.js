(function() {

    'use strict';

    angular.module('gSoft.client', ['ngRoute', 'gSoft.scrollPage'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/clients', {
                templateUrl: 'views/clients/clients.html',
                controller: 'ClientCtrl'
            });
        }
    ])

    .controller('ClientCtrl', ["$scope", "Constants", "Intercom", "LoadPage",
        function($scope, Constants, Intercom, LoadPage) {



            /*
             * We recieve messages from our form controller and this tells us how to process our view
             */
            $scope.viewSwitch = {};
            $scope.message = {};

            $scope.backgroundImage = "login"
            $scope.loadpage = false;
            $scope.loadcontainer = false;
            $scope.fadeinbackground = true;


            LoadPage.render($scope, 400, 400 );

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

                $scope.form = Constants.FORMS.forms.login;
            });




        }
    ]);

    var form



})();