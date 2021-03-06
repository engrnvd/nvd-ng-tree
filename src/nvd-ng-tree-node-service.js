angular.module('CustomAngular')
    .factory('NvdNgNodeService', function () {
        var Node = function (data) {
            this.id = null;
            this.label = "";
            this.children = null;
            this.parentId = null;
            this.checked = false;
            this.opened = false;
            this.hasCheckedChildren = false;

            for (var prop in data)
                this[prop] = data[prop];

            if (this.children) {
                this.children = Node.makeNodes(this.children);
                var parentId = this.id;
                this.children.forEach(function (node) {
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
            if (!value) this.hasCheckedChildren = false;
            // toggle-check for all children
            var thisNode = this;
            if (this.children) {
                thisNode.children.forEach(function (childNode) {
                    childNode.setChecked(value);
                });
            }
        };

        Node.prototype.updateParentCheckedStatus = function (collection) {
            var thisNode = this;
            if (thisNode.parentId) {
                var parentNode = thisNode.getParent(collection);
                var allChecked = true;
                var someChecked = false;
                parentNode.children.forEach(function (childNode) {
                    childNode.checked ? someChecked = true : allChecked = false;
                    if (childNode.hasCheckedChildren)
                        someChecked = true;
                });
                parentNode.checked = allChecked;
                parentNode.hasCheckedChildren = someChecked;

                if (parentNode.parentId)
                    parentNode.updateParentCheckedStatus(collection);
            }
        };

        Node.prototype.getParent = function (collection) {
            var thisNode = this;
            var secondaryCollection = [];
            var result = collection.find(function (node) {
                if (node.children)
                    secondaryCollection = secondaryCollection.concat(node.children);
                return node.id == thisNode.parentId;
            });

            if (!result && secondaryCollection)
                return thisNode.getParent(secondaryCollection);

            return result;
        };

        // build the api and return it
        return Node;
    });