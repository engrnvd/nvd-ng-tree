'use strict';

angular.module('myApp', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.data = [
            {id: 1,label: "Naveed",opened: true},
            {id: 1.1,label: "Angular",parentId:1},
            {id: 1.2,label: "Laravel", parentId: 1},
            {id: 1.11,label: "Angular", parentId: 1.1},
            {id: 1.12,label: "Laravel", parentId: 1.1},
            {id: 1.121, label: 'elixir', parentId: 1.12},
            {id: 1.122, label: 'policies', parentId: 1.12},
            {id: 2,label: "Ali"},
            {id: 2.1, label: "PHP", parentId: 2},
            {id: 2.2, label: "NetSuite", parentId: 2},
            {id: 3,label: "Basit"},
            {id: 3.1, label: "Node", parentId: 3},
            {id: 3.2, label: "Mongo", parentId: 3}
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
                scope.tree = new Tree({
                    nodes: scope.items
                });
            }
        };
    }])

    .factory('NvdNgNodeService', function () {
        var Node = function (data) {
            this.id = null;
            this.label = "";
            this.parentId = null;
            this.checked = false;
            this.opened = false;
            this.loading = false;
            this.hasCheckedChildren = false;
            this.tree = null;

            for ( var prop in data )
                this[prop] = data[prop];
        };

        //Node.makeNodes = function (items) {
        //    var collection = [];
        //    for (var $i = 0; $i < items.length; $i++) {
        //        collection.push(new Node(items[$i]));
        //    }
        //    return collection;
        //};

        Node.prototype.toggleOpen = function () {
            this.opened = !this.opened;
        };

        Node.prototype.toggleChecked = function (tree) {
            this.setChecked(!this.checked);
            // update parent status
            this.updateParentCheckedStatus(tree);
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

        Node.prototype.updateParentCheckedStatus = function (tree) {
            var thisNode = this;
            if (thisNode.parentId) {
                var parentNode = thisNode.getParent(tree);
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
                    parentNode.updateParentCheckedStatus(tree);
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

    .factory('NvdNgTreeService',['NvdNgNodeService', function (Node) {
        var Tree = function (config) {
            // default props
            this.parentKey = "parentId"; // key for the node that defines the parent id
            this.nodeLabel = function (node) { // default label for a node
                return node.id + ": " +node.label;
            };
            this._nextId = 1; // used when making nodes

            // override with user defined properties
            for (var prop in config)
                this[prop] = config[prop];

            // make nodes
            this.nodes = this.makeNodes(config.nodes);
        };

        Tree.prototype.getChecked = function () {
            return _.where(this.nodes, function (node) {
                if(node.checked)
                    console.log(node.label+" is checked");
                return node.checked === true;
            });
        };

        Tree.prototype.makeNodes = function (items) {
            var collection = [];
            for (var $i = 0; $i < items.length; $i++) {
                collection.push(new Node(items[$i]));
            }
            return collection;
        };

        // build the api and return it
        return Tree;
    }])
;