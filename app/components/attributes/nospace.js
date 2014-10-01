// This directive ensure there are no whitespaces in an input field
(function() {
    'use strict';


    angular.module('gSoft.noSpace', [])


    .directive('noSpace', function() {


        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {

                if (attrs.noSpace === 'true') {

                    element.on('keydown', function(event) {
                        if (event.keyCode === 32)
                            event.preventDefault();

                    })

                    modelCtrl.$parsers.push(function(inputValue) {

                        if (!inputValue)
                            return;

                        var transformedInput = inputValue.replace(/\s/g, "");

                        if (transformedInput != inputValue) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }

                        return transformedInput;
                    });


                }



            },

            controllerAs: 'NoSpaceCtl',
            scope: false
        }
    });

})()