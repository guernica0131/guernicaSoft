//ContactCtl

(function() {
    'use strict';

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

            extension = extension || 'jpg';

            console.log("Retriveing size");

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

        };


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

                extension = extension || 'jpg';


                 console.log("Retriveing size", resolution());


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



    /*

   .directive('imageFilter', function() {
        return {
            restrict: 'A',
            controller: function($scope, $window) {


                $(window).resize(function() {
                    var win = this;
                    $scope.$apply(function() {});
                })


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
        retrieve = function(request, name, extension) {

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
ng-src="{{images('THUMBS', p.content.thumbnail.src)}}" 

    */


    .directive('imageSrc',  function(ImageLocation) {
        return {
            restrict: 'A',
            controller: function($scope, $window) {


                // $(window).resize(function() {
                //     var win = this;
                //     $scope.$apply(function() {});
                // })

            },
            link: function(scope, element, attrs) {

                //console.log(ImageLocation)

                var input = angular.fromJson(attrs.imageSrc),
                    fullPath = ImageLocation.retrieve(input);
                attrs.$set(scope.src || "src", fullPath);

            },

            controllerAs: 'ImageFilterCtl',
            scope: {
                src: "@src"
            }
            ///  location: true
        }
    })

    .directive('imageBackground', function(ImageLocation) {
        return {
            restrict: 'A',
            controller: function($scope, $window) {


                 $(window).resize(function() {
                var win = this;
                $scope.$apply(function() {});
            })


                //$scope.src = "FUCKER";



            },

            link: function(scope, element, attrs) {

                // console.log(element)

                var input = angular.fromJson(attrs.imageBackground),
                    fullPath = ImageLocation.retrieve(input);

                attrs.$set('style', 'background: url(' + fullPath + ")");

                //  attrs.$set(scope.image || "src", fullPath);

            },

            controllerAs: 'ImageFilterCtl',
            scope: {
                src: "@style"
            }
            ///  location: true
        }
    });

    // return function(scope, elm, attrs) {
    //   };

})()