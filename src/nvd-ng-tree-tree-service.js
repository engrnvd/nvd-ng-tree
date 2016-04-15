angular.module('NvdNg')
    .factory('NvdNgTreeService', ['NvdNgNodeService', function (Node) {
        var Tree = function (items) {
            var thisTree;
            this.nodes = Node.makeNodes(items);
        };

        Tree.prototype.getChecked = function () {
            return _.filter( this.nodes, function (node) {
                return node.checked || node.hasCheckedChildren;
            } );
        };

        // build the api and return it
        return Tree;
    }]);