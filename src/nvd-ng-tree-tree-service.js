angular.module('CustomAngular')
    .factory('NvdNgTreeService', ['NvdNgNodeService', function (Node) {
        var Tree = function (items) {
            var thisTree;
            this.nodes = Node.makeNodes(items);
        };

        Tree.prototype.getChecked = function () {
            return this.nodes.filter(function (node) {
                return node.checked || node.hasCheckedChildren;
            } );
        };

        // build the api and return it
        return Tree;
    }]);