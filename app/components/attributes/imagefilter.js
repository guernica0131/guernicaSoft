//ContactCtl

(function() {
    'use strict';


    angular.module('gSoft.ImageFilter', [])



    

    .directive('imageSrc', function(ImageLocation) {
        return {
            restrict: 'A',
            controller: function($scope) {},
            link: function(scope, element, attrs) {

                var images = ImageLocation.retrieve;

                var input = angular.fromJson(attrs.imageSrc),
                    fullPath = images(input);

                if (!input.name)
                    return;

                attrs.$set(scope.src || "src", fullPath);

            },
            controllerAs: 'ImageFilterCtl',
            scope: false
        }
    })

    .directive('imageBackground', function(ImageLocation) {

        var setStyle = function(attrs, input) {
            // return if there is no input
            if (!input || !input.name)
                return;
            // pull the images from ImageLocation
            var images = ImageLocation.retrieve,
                fullPath = images(input), // full path
                image = 'background: url(' + fullPath + ")"; // build the attribute tag
            // if there is a change from the current
            if (attrs.style !== image)
                attrs.$set('style', image); // we apply
        };

        return {
            restrict: 'A',
            controller: function($scope) {},
            link: function(scope, element, attrs) {
                // we set the style for the initial load
                var input = angular.fromJson(attrs.imageBackground);

                setStyle(attrs, input);
                // if the window size changes, we need to see if we need to
                // change the window based on the screen size
                $(window).resize(function() {
                    // var win = this; // not needed now
                    scope.$apply(function() {
                        setStyle(attrs, input);
                    });

                });
                // if there is a change to the background
                scope.$watch('backgroundImage', function(data) {
                    if (!data)
                        return;
                    // we need to update the input variable
                    input = {
                        name: data,
                        request: 'BODY' // we assume it is body image since we are working with background
                    };
                    // set the new style
                    setStyle(attrs, input);

                });

            },

            controllerAs: 'ImageFilterCtl',
            scope: false
        }
    });



})()