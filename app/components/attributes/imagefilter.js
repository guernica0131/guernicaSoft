//ContactCtl

(function() {
    'use strict';


    angular.module('gSoft.ImageFilter', [])



    .factory('ImageLocation', function() {

        var directory = 'images/portals/',
            resolution = function() {
                var width = $(window).width();
                //console.log("My width", width);
                if (width > 2000)
                    return 'high';
                else if (width > 1200)
                    return 'med';
                else
                    return 'low';

            },
            retrieve = function(params) {
                var name = params.name,
                    request = params.request,
                    extension = params.extension;

                if (!name)
                    return;

                extension = extension || 'jpg';

                switch (request) {
                    case 'BODY':
                        return directory + resolution() + '/' + name + '-body' + '.' + extension;
                    case 'BODY_HIGH':
                        return directory + 'high/' + name + '-body' + '.' + extension;
                    case 'BODY_MED':
                        return directory + 'med/' + name + '-body' + '.' + extension;
                    case 'BODY_LOW':
                        return directory + 'low/' + name + '-body' + '.' + extension;
                    case 'THUMBS':
                        return directory + 'thumbs/' + name + '-thumb' + '.' + extension;
                    case 'ROW':
                        return directory + 'rows' + name + '-row' + '.' + extension;
                    case 'HEAD':
                        return directory + resolution() + '/' + name + '-head' + '.' + extension;
                    default:
                        return directory;
                }

            }

        return {
            retrieve: retrieve
        }

    })

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
        return {
            restrict: 'A',
            controller: function($scope) {},
            link: function(scope, element, attrs) {

                var images = ImageLocation.retrieve;
               
                var input = angular.fromJson(attrs.imageBackground),
                    fullPath = images(input);

                if (!input.name)
                    return;

                attrs.$set('style', 'background: url(' + fullPath + ")");

                $(window).resize(function() {
                    //     var win = this;
                    scope.$apply(function() {

                        fullPath = images(input);
                        var image = 'background: url(' + fullPath + ")";
                        //console.log(attrs.style === image);
                        if (attrs.style !== image)
                            attrs.$set('style', 'background: url(' + fullPath + ")");

                    });

                })

            },

            controllerAs: 'ImageFilterCtl',
            scope: false
        }
    });



})()