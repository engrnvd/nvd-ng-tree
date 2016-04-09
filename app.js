'use strict';

angular.module('myApp', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.data = [
            {
                id: 1,
                label: "Naveed",
                children: [
                    {
                        id: 1.1,
                        label: "Angular",
                        children: [
                            {
                                id: 1.1,
                                label: "Angular"
                            },
                            {
                                id: 1.2,
                                label: "Laravel"
                            }
                        ]
                    },
                    {
                        id: 1.2,
                        label: "Laravel"
                    }
                ]
            },
            {
                id: 2,
                label: "Ali",
                children: [
                    {
                        id: 2.1,
                        label: "PHP"
                    },
                    {
                        id: 2.2,
                        label: "NetSuite"
                    }
                ]
            },
            {
                id: 3,
                label: "Basit",
                children: [
                    {
                        id: 3.1,
                        label: "Node"
                    },
                    {
                        id: 3.2,
                        label: "Mongo"
                    }
                ]
            }
        ];
    }])

    .directive('nvdNgTree', function () {
        return {
            restrict: 'E',
            templateUrl: 'nvd-ng-tree.html',
            scope: {
                items: '=items'
            },
            link: function (scope, elem, attrs) {

            }
        };
    });