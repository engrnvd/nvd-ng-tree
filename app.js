'use strict';

angular.module('myApp', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.data = [];
    }])

    .directive('nvdNgTree', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                // watch when the attribute changes
                scope.$watch(attrs['nvdNgTree'], function (data) {

                });
            }
        };
    });