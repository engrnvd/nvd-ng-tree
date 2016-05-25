'use strict';

angular.module('myApp', ['CustomAngular'])
    .controller('MainCtrl', ['$scope', 'NvdNgTreeService', function ($scope, Tree) {
        var data = [
            {
                id: 1,
                label: "Naveed",
                opened: true,
                children: [
                    {
                        id: 1.1,
                        label: "Angular",
                        children: [
                            {
                                id: 1.11,
                                label: "Angular"
                            },
                            {
                                id: 1.12,
                                label: "Laravel",
                                children: [
                                    {id: 1.121,label:'elixir'},
                                    {id: 1.122,label:'policies'}
                                ]
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
        $scope.tree = new Tree(data);
    }]);