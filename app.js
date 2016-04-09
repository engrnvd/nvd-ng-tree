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

    .directive('nvdNgTree',['NvdNgTreeNodeService', function (Node) {
        return {
            restrict: 'E',
            templateUrl: 'nvd-ng-tree.html',
            scope: {
                items: '=items'
            },
            link: function (scope, elem, attrs) {
                scope.nodes = Node.makeNodes(scope.items);
            }
        };
    }])

    .factory('NvdNgTreeNodeService', function () {
        var Node = function (data) {
            this.id = null;
            this.label = "";
            this.children = null;
            this.parent = null;
            this.selected = false;
            this.opened = false;

            for ( var prop in data )
                this[prop] = data[prop];

            if(this.children)
                this.children = Node.makeNodes(this.children);
        };

        Node.makeNodes = function (items) {
            var collection = [];
            for (var $i = 0; $i < items.length; $i++) {
                collection.push(new Node(items[$i]));
            }
            return collection;
        };

        Node.prototype.toggleOpen = function () {
            this.opened = !this.opened;
        };

        Node.prototype.toggleSelected = function () {
            this.selected = !this.selected;
        };

        // build the api and return it
        return Node;

    })
;