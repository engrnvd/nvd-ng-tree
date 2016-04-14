'use strict';

angular.module('myApp', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.data = [
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
    }])

    .directive('nvdNgTree',['NvdNgTreeService', function (Tree) {
        return {
            restrict: 'E',
            templateUrl: 'nvd-ng-tree.html',
            scope: {
                items: '=items'
            },
            link: function (scope, elem, attrs) {
                scope.tree = new Tree(scope.items);
            }
        };
    }])

    .factory('NvdNgTreeNodeService', function () {
        var Node = function (data) {
            this.id = null;
            this.label = "";
            this.children = null;
            this.parentId = null;
            this.checked = false;
            this.opened = false;
            this.hasCheckedChildren = false;

            for ( var prop in data )
                this[prop] = data[prop];

            if(this.children)
            {
                this.children = Node.makeNodes( this.children );
                var parentId = this.id;
                _.map(this.children, function (node) {
                    node.parentId = parentId;
                });
            }
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

        Node.prototype.toggleChecked = function (collection) {
            this.setChecked(!this.checked);
            // update parent status
            this.updateParentCheckedStatus(collection);
        };

        Node.prototype.setChecked = function (value) {
            this.checked = value;
            if(!value) this.hasCheckedChildren = false;
            // toggle-check for all children
            var thisNode = this;
            if (this.children) {
                _.map(thisNode.children, function (childNode) {
                    childNode.setChecked(value);
                });
            }
        };

        Node.prototype.updateParentCheckedStatus = function (collection) {
            var thisNode = this;
            if (thisNode.parentId) {
                console.log("the node has parent");
                var parentNode = thisNode.getParent(collection);
                console.log(parentNode);
                var allChecked = true;
                var someChecked = false;
                _.map(parentNode.children, function (childNode) {
                    childNode.checked ? someChecked = true : allChecked = false;
                    if( childNode.hasCheckedChildren )
                        someChecked = true;
                });
                parentNode.checked = allChecked;
                parentNode.hasCheckedChildren = someChecked;

                if(parentNode.parentId)
                    parentNode.updateParentCheckedStatus(collection);
            }
        };

        Node.prototype.getParent = function (collection) {
            var thisNode = this;
            var secondaryCollection = [];
            var result = _.find(collection, function (node) {
                if(node.children)
                    secondaryCollection = _.union(secondaryCollection,node.children);
                return node.id == thisNode.parentId;
            });

            if( !result && secondaryCollection )
                return thisNode.getParent(secondaryCollection);

            return result;
        };

        // build the api and return it
        return Node;
    })

    .factory('NvdNgTreeService',['NvdNgTreeNodeService', function (Node) {
        var Tree = function (items) {
            var thisTree;
            this.nodes = Node.makeNodes(items);
        };

        Tree.prototype.getChecked = function () {

        };

        // build the api and return it
        return Tree;
    }])
;